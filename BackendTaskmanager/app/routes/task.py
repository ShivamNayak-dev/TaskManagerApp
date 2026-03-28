from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.utils.auth import get_current_user, get_admin_user


router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"]
)

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # JWT protected
):
  
    new_task = Task(
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority,
        user_id=current_user.id  # automatically assign to logged in user
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("/", response_model=List[TaskResponse])
def get_my_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # JWT protected
):
    """
    Like @GetMapping("/") in Spring Boot
    Returns all tasks of logged in user
    """
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    return tasks


@router.get("/all", response_model=List[TaskResponse])
def get_all_tasks(
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)  # ADMIN ONLY
):
 
    tasks = db.query(Task).all()
    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # JWT protected
):
   
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found!"
        )
    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # JWT protected
):
   
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found!"
        )

    
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.is_completed is not None:
        task.is_completed = task_data.is_completed
    if task_data.priority is not None:
        task.priority = task_data.priority

    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # JWT protected
):
  
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found!"
        )

    db.delete(task)
    db.commit()
    return None