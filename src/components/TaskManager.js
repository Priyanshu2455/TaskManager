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
    case 'MARK_DONE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, done: true } : task
        ),
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
  const [search, setSearch] = useState('');


  const filteredTasks = state.tasks.filter(task => {
    if (filter === 'Done') return task.done;
    if (task.done) return false; // Exclude done tasks from other filters
    if (filter !== 'All' && task.priority !== filter) return false; 
    return task.title.toLowerCase().includes(search.toLowerCase());
  });
  

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? `dark-mode` : `task-manager`}>
    <div style={{display:"flex" , justifyContent:"end",marginTop : "5px" , marginBottom:"5px"}} >
      <button className="button" onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
      <div className="header">
        <h1>Task List View</h1>
        <button onClick={() => dispatch({ type: 'EDIT_TASK', payload: {} })}>
          Add New Task
        </button>
      </div>
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
