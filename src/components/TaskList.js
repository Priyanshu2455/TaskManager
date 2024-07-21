import React from 'react';
import './TaskList.css';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineDownloadDone } from "react-icons/md";



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
          <div>
            <p title={task.description}> {task.description.length > 25 ? `${task.description.slice(0, 20)}...` : task.description}</p>
          </div>
          <div style={{marginLeft:"5px"}} className="priority">
            <p style={{fontWeight:""}} >{task.priority}</p>  
          </div>
          <div className="actions">
            <button style={{color:"blue"}} onClick={() => dispatch({ type: 'EDIT_TASK', payload: task })}>
              <MdEdit/>
            </button>
            <button style={{color:"red"}} onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
              <MdDelete/>
            </button>
            {!task.done && (
              <button style={{color:"blue"}} onClick={() => dispatch({ type: 'MARK_DONE', payload: task.id })}>
                <MdOutlineDownloadDone title='Mark as done' />
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
