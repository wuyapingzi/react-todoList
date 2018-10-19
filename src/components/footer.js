
import React from 'react'
import {Link} from 'react-router-dom'

export default function(props){
  let {
    clearCompletedTodo,
    showClearBtn,
    // view,
    // changeView,
    leftItem,
    pathname,
  } = props;

  return(
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{leftItem}</strong>
        <span>item left</span>
      </span>
      <ul className='filters'>
        <li>
          <Link 
            to='/'
            className={pathname === '/'? 'selected': ''}
          >
          All
          </Link>
          {/* <a
            className={view === 'all'? 'selected': ''}
            onClick={()=>changeView('all')}
          >
            All
          </a> */}
        </li>
        <li>
          <Link
            className={pathname === '/active'? 'selected': ''}
            to='/active'
          >
          Active
          </Link>
          {/* <a
            className={view === 'active'? 'selected': ''}
            onClick={()=>changeView('active')}
          >Active</a> */}
        </li>
        <li>
          <Link
            className={pathname === '/completed'? 'selected': ''}
            to='/completed'
          >
          Completed
          </Link>
          {/* <a
            className={view === 'completed'? 'selected': ''}
            onClick={()=>changeView('completed')}
          >Completed</a> */}
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