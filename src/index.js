import React, {Component, createRef, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import Todo from './components/todo';
import Footer from './components/footer';
import Tab from './components/tab';

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

    let {todoList,} = this.state;
    let activeTodo = todoList.some(elt=>elt.hasCompleted===false);
    let completedTodo = todoList.some(elt=>elt.hasCompleted);
    //底层组件也拿到浏览器的url，就需要用location.pathname，match的url就不行了。
    let {location:{pathname}} = this.props;

    let leftItem = 0;
    let showTodoData = todoList.filter(elt => {
      if(!elt.hasCompleted) leftItem++;
      switch(pathname){
        case '/active':
          return !elt.hasCompleted;
        case '/completed':
          return elt.hasCompleted;
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
                  // view,
                  // changeView: this.changeView,
                  leftItem,
                  pathname,
                }
              }
            />
          </Fragment>
        )}

      </div>
    );
  }
}


class Child extends Component {
  constructor() {
    super()
    console.log('Child was created!')
  }
  componentWillMount(){
    console.log('Child componentWillMount!')
  }
  componentDidMount(){
    console.log('Child componentDidMount!')
  }
  componentWillReceiveProps(nextProps){
    console.log('Child componentWillReceiveProps:'+nextProps.data )
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('child==========', nextProps, nextState)
    console.log('Child shouldComponentUpdate:'+ nextProps.data)
    return true
  }
  componentWillUpdate(nextProps, nextState){
    console.log('Child componentWillUpdate:'+ nextProps.data)
  }
  componentDidUpdate(){
    console.log('Child componentDidUpdate')
  }
  render() {
    console.log('render Child!')
    return (      
      <h1>Child recieve props: {this.props.data}</h1>      
    );
  }
}

class Father extends Component {
  // ... 前面跟子组件一样
  constructor() {
    super()
    console.log('Father was created!');
    this.state = {
      randomData: 0,
      count: 0
    }
    this.handleChangeState = this.handleChangeState.bind(this);// 因为handleChangeState是普通函数，如果不手动绑定this，handleChangeState里面的this已经不是组件里的this了，就会报错：TypeError: Cannot read property 'setState' of undefined。第二种方法是将handleChangeState函数改为箭头函数。
    // 为什么要这样呢？在react里面，需要将类的原型方法通过props传给子组件，传统写法需要bind(this)，否则执行时this会找不到。
    // 手动绑定this和使用箭头函数的区别？ 手动绑定this这种写法难看不说，还会对React组件的shouldComponentUpdate优化造成影响。因为React提供了shouldComponentUpdate让开发者能够控制不必要的render，还提供了在shouldComponentUpdate自动进行shallow Compare的React.PureComponent，继承自PureComponet的组件只要props和state中的值不变，组件就不会重新render。然而用了bind(this)，每次父组件渲染，传递给子组件的props.onClick都会变，PureComponent的shallow Compare基本上就失效了，除非手动实现shouldComponentUpdate
  }
  
  componentWillMount(){
    console.log('Father componentWillMount!')
  }
  componentDidMount(){
    console.log('Father componentDidMount!')
    // this.setState({count: this.state.count + 1})
    // this.setState({count: this.state.count + 1})
    // this.setState({count: this.state.count + 1})
    
  }
  // componentWillReceiveProps(nextProps){
  //   console.log('Father componentWillReceiveProps:'+nextProps.data )
  // }
  shouldComponentUpdate(nextProps, nextState){
    console.log('Father shouldComponentUpdate:'+ nextState.randomData)
    return true
  }
  componentWillUpdate(nextProps, nextState){
    console.log('father============',nextProps, nextState)
    console.log('Father componentWillUpdate:'+ nextState.randomData)
  }
  componentDidUpdate(){
    console.log('Father componentDidUpdate')
  }
  // ......
  handleChangeState(){
    this.setState({randomData: Math.floor(Math.random()*50)})
    // 这种情况没有实现增加三次的目的，因为在执行this.setState()时，react没有忙着立即更新state，只是把新的state存到一个队列（batchUpdate）中，下面三次执行的setState只是对穿进去的对象进行合并，然后再统一进行处理，出发重新渲染过程。
    this.setState({count: this.state.count + 1})
    console.log('111111111', this.state.count)
    this.setState({count: this.state.count + 1})
    console.log('22222222', this.state.count)
    this.setState({count: this.state.count + 1})
    console.log('333333333', this.state.count)

    // 下面的方式可以实现增加三次的目的，因为react会把setState里传进去的函数放在一个队列里，react会一次调用队列里的函数，传递给他们前一刻的state
    // this.setState((prevState) => ({count: prevState.count+1}))
    // this.setState((prevState) => ({count: prevState.count+1}))
    // this.setState((prevState) => ({count: prevState.count+1}))
  }
  render() {
    console.log('render Father!')
    return (
      <div>
        <Child data={this.state.randomData} />
        <h1>Father State: { this.state.randomData}</h1>      
        <button onClick={this.handleChangeState}>切换状态</button>
      </div>
    );
  }
}


ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' component = {TodoList} exact/>
      <Route path='/test' component = {Father} exact/>
      <Route path='/tab' component = {Tab} exact/>
    </Switch>
    
  </Router>
  ,
  document.getElementById('root')
);
