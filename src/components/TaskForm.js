import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, dispatch }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [priority, setPriority] = useState(task.priority || 'Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, dueDate, priority };
    if (task.id) {
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      dispatch({ type: 'CANCEL_EDIT' })
    } else {
      updatedTask.id = Date.now();
      dispatch({ type: 'ADD_TASK', payload: updatedTask });
      dispatch({ type: 'CANCEL_EDIT' })
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <div className="buttons">
        <button type="submit" className="save-button">Save Changes</button>
        <button
          type="button"
          className="cancel-button"
          style={{marginLeft:"10px"}}
          onClick={() => dispatch({ type: 'CANCEL_EDIT' })}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
