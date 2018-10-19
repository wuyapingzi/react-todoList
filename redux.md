# redux
  redux就是用来统一管理项目中的状态。它可以是前后端的各种数据，也可以是UI上的一些信息。简单点，它就是个对象，包含了项目中可能用于改变的一些信息。
  redux重要关注的几点：Actions，Reducers，Store。
  store就是保存数据的地方，用来管理state的单一对象。Redux用createStore生成store。
  ```
    import { createStore } form 'redux'
    const store = createStore(fn) 
  ```
### store有三个方法：
  `store.getState()`：获取state； 
  `store.dispatch(action)`：发出操作，更新state。
  `store.subscribe(listen)`：监听变化，当state发生更新时，就可以在这个函数的回调中监听。只要state发生变化，就会自动执行listen函数。
### action
  view的变化，会导致state的变化，action就是view发出的通知，表示state应该要发生变化了。
  action是一个对象，其中type属性是必须的，表示action的名称。action里边存储了操作需要更改的一些数据。
  `store.dispatch()`是view发出action的唯一方法。
  ```
    store.dispatch({
      type: 'addNum',
      payload: '吃饭睡觉打豆豆'
    })
  ```
  ** view  ----store.dispatch---> action ---reducers(action,state)--> state ---> Components
### reducers
  reducers是一个会对不同action做出不同操作的函数
  ```
    const reducers = (state, action) =>{
      switch(action.type) {
        case: 'add':
          return state+action.payload 
        case: 'del':
          return state-action.payload 
        default:
          return state
     }
    }
    const ret = reducers(1, {
        type: 'add',
        payload: 1
    }) // 2
    const ret = reducers(1, {
        type: 'del',
        payload: 1
    }) // 0
  ```
  reducers其实不用手动调用，store.dispatch方法会自动调用reducers方法，因此，store需要知道reducers函数，再生成store时，就要将reducers传入createStore方法；
  ```
    import { createStore } form 'redux'
    const reducers = (state,action)=> {return ...state}
    const store = createStore(reducers)  //将reducers方法传给store
  ```
  demo
  ```
  import React from 'react';
  import ReactDom from 'react-dom';
  import {createStore} from 'redux';

  const Counter = ({value, onAdd, onDel})=>(
    <div>
      <h1>{value}</h1>
      <button onClick={onAdd}> + </button>
      <button onClick={onDel}> - </button>
    </div>
  );

  const reducer = (state = 0, action) => {
    switch(action.type){
      case 'add': return state + 1;
      case 'del': return state - 1;
      default: return state;
    }
  }

  const store = createStore(reducer);

  const test = () =>{
    ReactDom.render(
      <Counter
        value={store.getState()}
        onAdd = ()=>store.dispatch({type: 'add'})
        onDel = ()=>store.dispatch({type: 'del'})
      />,
      document.getElementById('root')
    );
  }
  test();
  store.subscribe(test);
  ```
