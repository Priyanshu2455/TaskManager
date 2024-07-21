import React from 'react';
import TaskForm from './TaskForm';
import './TaskEditModal.css';

const TaskEditModal = ({ task, dispatch }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Task</h2>
          {/* <button onClick={() => dispatch({ type: 'CANCEL_EDIT' })}>Delete</button> */}
        </div>
        <TaskForm task={task} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default TaskEditModal;
