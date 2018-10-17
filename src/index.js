import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoList extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <header className='header'>
          <h1> todos </h1>
          {/* 输入框 */}
          <input
            type='text'
            className='new-todo'
            placeholder='type something here'
          />
        </header>
        <section className='main'>
          {/* 全选按钮 */}
          <input
            type='checkbox'
            className='toggle-all'
          />
          <ul className='todo-list'>
            <li>
              <div className='view'>
                {/* 勾选按妞 */}
                <input
                  type='checkbox'
                  className='toggle'
                />
                <label ref='label'>
                  我是todo内容
                </label>
                {/* 删除按钮 */}
                <button
                  className='destroy'
                  ref='btn'
                ></button>
                {/* 编辑TODO的输入框 */}
                <input
                  type='text'
                  className='edit'
                  ref='editInput'
                />
              </div>
            </li>

          </ul>

        </section>
        <footer className='footer'>
          <span className='todo-count'>
            <strong>8</strong>
            <span>item left</span>
          </span>
          <ul className='filters'>
            <li>
              <a
                className='selected'
              >
                All
              </a>
            </li>
            <li>
              <a
                className='selected'
              >Active</a>
            </li>
            <li>
              <a
                className='clear-completed'
              >Completed</a>
            </li>
          </ul>
          <button
            className='clear-completed'
          >
            clear all completed
          </button>
        </footer>
      </div>
    );
  }
}




ReactDOM.render(
  <TodoList />, 
  document.getElementById('root')
);
