import React, { useState, useReducer } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskEditModal from './TaskEditModal';
import './TaskManager.css';

const initialState = {
  tasks: [],
  editingTask: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    case 'EDIT_TASK':
      return { ...state, editingTask: action.payload };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        editingTask: null,
      };
    case 'CANCEL_EDIT':
      return { ...state, editingTask: null };
    default:
      return state;
  }
}

const TaskManager = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [filter, setFilter] = useState('All');

  const filteredTasks = state.tasks.filter(task => {
    if (filter === 'All') return true;
    return task.priority === filter;
  });

  return (
    <div className="task-manager">
      <div className="header">
        <h1>Task List View</h1>
        <button onClick={() => dispatch({ type: 'EDIT_TASK', payload: {} })}>
          Add New Task
        </button>
      </div>
      <div className="task-filter">
        {['All', 'High', 'Medium', 'Low', 'Done'].map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <TaskList tasks={filteredTasks} dispatch={dispatch} />
      {state.editingTask && (
        <TaskEditModal
          task={state.editingTask}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default TaskManager;
