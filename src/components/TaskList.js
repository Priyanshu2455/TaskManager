import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, dispatch }) => {
  return (
    <ul className="task-list">
      { tasks?.length > 0 ?
       tasks.map(task => (
        <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
          <div className="info">
            <div className="title">{task.title}</div>
            <div className="date">Due Date: {task.dueDate}</div>
          </div>
          <div  >
          <span title={task.description}> {task.description.length > 25 ? `${task.description.slice(0, 20)}...` : task.description}</span>
          </div>
          <div style={{marginLeft:"5px"}} className="priority">
            <span style={{fontWeight:"bold"}} >{task.priority}</span>  
          </div>
          <div className="actions">
            <button onClick={() => dispatch({ type: 'EDIT_TASK', payload: task })}>
              Edit
            </button>
            <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
              Delete
            </button>
            {!task.done && (
              <button onClick={() => dispatch({ type: 'MARK_DONE', payload: task.id })}>
                Mark as Done
              </button>
            )}
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
