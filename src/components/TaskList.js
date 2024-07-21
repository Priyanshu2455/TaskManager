import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, dispatch }) => {
  return (
    <ul className="task-list">
      { tasks.length > 0 ?
       tasks.map(task => (
        <li key={task.id} className="task-item">
          <div className="info">
            <div className="title">{task.title}</div>
            <div className="date">Due Date: {task.dueDate}</div>
          </div>
          <div className="priority">
            <span>{task.priority}</span>
          </div>
          <div  className="actions">
            <button onClick={() => dispatch({ type: 'EDIT_TASK', payload: task })}>
              Edit
            </button> 
            <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
              Delete
            </button>
          </div>
        </li>
      ))
      :
      <p style={{marginLeft:"10px"}} >No task avilable.</p>
    }
    </ul>
  );
};

export default TaskList;
