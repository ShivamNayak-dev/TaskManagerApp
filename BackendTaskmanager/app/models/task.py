from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.config.database import Base


class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    
    
    is_completed = Column(Boolean, default=False)
    
    
    priority = Column(String(10), default="medium")

    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", backref="tasks")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())