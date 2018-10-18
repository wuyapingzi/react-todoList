import React, {Component, createRef, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './index.css';
import Todo from './components/todo';
import Footer from './components/footer';

class TodoList extends Component{
  constructor(props){
    super(props);
    this.state = {
      todoList: [],
      view: 'all',
    }
    this.todoInput = createRef();
  }
  // 添加todo
  addTodo = (ev) => {
    
    let {value} = this.todoInput.current;
    if(ev.keyCode !== 13 || !value.trim()){
      return;
    }
    let {todoList} = this.state;
    this.setState({
      todoList: [
        {
          id: Math.random(),
          content: value,
          hasCompleted: false,
        },
        ...todoList
      ]
    }, () => {
      this.todoInput.current.value = '';
    });
  }
  // 删除todo
  deleteTodo = (id)=>{
    let {todoList} = this.state;

    todoList = todoList.filter((elt) => {
      return elt.id !==id;
    })

    this.setState({
      todoList
    })
  }
  // 改变todo的状态
  toggleTodoState = (id) => {
    let {todoList} = this.state;
    todoList = todoList.map((elt) => {
      if(elt.id === id){
        elt.hasCompleted = !elt.hasCompleted;
      }
      return elt;
    })
    this.setState({
      todoList,
    })
  }
  // 改变所有todo的状态
  toggleAllState = (ev) => {
    // ev.target.value =>  on
    // ev.target.checked  => true
    let {todoList} = this.state;
    todoList = todoList.map((elt)=>{
      elt.hasCompleted = ev.target.checked; //将每一项的hasCompleted的值设置成 全选框的checked值
      return elt;
    })
    this.setState({
      todoList,
    })
  }
  //编辑一条todo
  alterTodoContent = (id, content)=>{
    let {todoList} = this.state;
    todoList = todoList.map(elt=>{
      if(elt.id === id){
        elt.content = content;
      }
      return elt;
    })
    this.setState({
      todoList
    });
  }
  //删除所有已完成的todo
  clearCompletedTodo = ()=>{
    let {todoList} = this.state;
    todoList = todoList.filter((elt)=>{
      return !elt.hasCompleted;
    });
    this.setState({
      todoList
    })
  }
  //切换view视图
  changeView = (view)=>{
    this.setState({
      view: view,
    })
  }
  render(){

    let {todoList, view} = this.state;
    let activeTodo = todoList.some(elt=>elt.hasCompleted===false);
    let completedTodo = todoList.some(elt=>elt.hasCompleted);

    let leftItem = 0;
    let showTodoData = todoList.filter(elt => {
      if(!elt.hasCompleted) leftItem++;
      switch(view){
        case 'active':
          return !elt.hasCompleted;
        case 'completed':
          return elt.hasCompleted;
        case 'all':
        default:
          return true;
      }
    })
    let todos = showTodoData.map((elt) => {
      return(
        <Todo
          key = {elt.id}
          {
            ...{
              id: elt.id,
              content: elt.content,
              deleteTodo: this.deleteTodo,
              hasCompleted: elt.hasCompleted,
              toggleTodoState: this.toggleTodoState,
              alterTodoContent: this.alterTodoContent,
            }
          }
          
        />
      );
    });
    return(
      <div className='todoapp'>
        <header className='header'>
          <h1> todos </h1>
          {/* 输入框 */}
          <input
            type='text'
            className='new-todo'
            placeholder='type something here'
            ref={this.todoInput}
            onKeyDown={this.addTodo}
          />
        </header>
        {todoList.length>0 && (
          <Fragment>
            <section className='main'>
              {/* 全选按钮 */}
              <input
                type='checkbox'
                className='toggle-all'
                checked={!activeTodo && todoList.length}
                onChange={this.toggleAllState}
              />
              <ul className='todo-list'>
                {todos}
              </ul>

            </section>
            <Footer
              {
                ...{
                  clearCompletedTodo: this.clearCompletedTodo,
                  showClearBtn: completedTodo && todoList.length > 0,
                  view,
                  changeView: this.changeView,
                  leftItem,
                }
              }
            />
          </Fragment>
        )}

      </div>
    );
  }
}




ReactDOM.render(
  <Router>
    <Route path='/'/>
    <TodoList />
  </Router>
  , 
  document.getElementById('root')
);
