import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyTasks, createTask, updateTask, deleteTask } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getMyTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks!');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '', priority: 'medium' });
      fetchTasks();
    } catch (err) {
      setError('Failed to create task!');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { is_completed: !task.is_completed });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task!');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task!');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#16a34a';
      default: return '#888';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="header-title">📋 Task Manager</h2>
          <p className="header-sub">
            Welcome, <strong>{username}</strong>!
            Role: <span className="role-badge">{role}</span>
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="dashboard-content">
        {/* Create Task */}
        <div className="dashboard-card">
          <h3 className="card-title">➕ Create New Task</h3>
          {error && <div className="dash-error">{error}</div>}
          <form onSubmit={handleCreateTask}>
            <input className="dash-input" type="text" placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required />
            <input className="dash-input" type="text" placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            <select className="dash-input" value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <button className="dash-button" type="submit">➕ Add Task</button>
          </form>
        </div>

        {/* Task List */}
        <div className="dashboard-card">
          <h3 className="card-title">
            📝 My Tasks {tasks.length > 0 && `(${tasks.length})`}
          </h3>
          {loading && <p className="dash-loading">Loading tasks...</p>}
          {!loading && tasks.length === 0 && (
            <p className="dash-empty">No tasks yet! Create your first task above. 👆</p>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="task-card"
              style={{ borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                opacity: task.is_completed ? 0.6 : 1 }}>
              <div className="task-header">
                <div className="task-left">
                  <input type="checkbox" className="task-checkbox"
                    checked={task.is_completed}
                    onChange={() => handleToggleComplete(task)} />
                  <div>
                    <p className="task-title"
                      style={{ textDecoration: task.is_completed ? 'line-through' : 'none' }}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="task-desc">{task.description}</p>
                    )}
                  </div>
                </div>
                <div className="task-right">
                  <span className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </span>
                  <button className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}>🗑️</button>
                </div>
              </div>
              <p className="task-date">
                Created: {new Date(task.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;