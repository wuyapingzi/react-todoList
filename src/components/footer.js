
import React from 'react'

export default function(props){
  let {
    clearCompletedTodo,
    showClearBtn,
    view,
    changeView,
    leftItem,
  } = props;

  return(
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{leftItem}</strong>
        <span>item left</span>
      </span>
      <ul className='filters'>
        <li>
          <a
            className={view === 'all'? 'selected': ''}
            onClick={()=>changeView('all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            className={view === 'active'? 'selected': ''}
            onClick={()=>changeView('active')}
          >Active</a>
        </li>
        <li>
          <a
            className={view === 'completed'? 'selected': ''}
            onClick={()=>changeView('completed')}
          >Completed</a>
        </li>
      </ul>
      {showClearBtn && (
        <button
          className='clear-completed'
          onClick={() => clearCompletedTodo()}
        >
          clear all completed
        </button>
      )}
      
    </footer>
  );
}