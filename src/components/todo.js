import React, {Component, createRef} from 'react';

export default class Todo extends Component{
  constructor(props){
    super(props);
    this.state={
      inEdit: false
    }
    this.editInput = createRef();

  }

  onEdit = ()=>{
    this.setState({
      inEdit: true
    }, ()=>{
      let editInput = this.editInput.current;
      editInput.focus();
      editInput.value = this.props.content;
    })
  }
  commitChange = ()=>{
    let {current} = this.editInput;
    let content = current.value.trim();

    if(content){
      this.props.alterTodoContent(this.props.id, content);
    }else{
      this.props.deleteTodo(this.props.id);
    }
    
  }

  onBlur = ()=>{
    if(!this.state.inEdit) return;
    this.setState({
      inEdit: false
    });
    this.commitChange();
  }

  onKeyDown = (ev)=>{
    if(ev.keyCode === 27 || ev.keyCode === 13){
      this.setState({
        inEdit: false
      })
    }
    if(ev.keyCode === 13){
      this.commitChange();
    }
  }

  render(){
    let {
      id, 
      content, 
      deleteTodo,
      hasCompleted,
      toggleTodoState,
    } = this.props;

    let {inEdit} = this.state;
    let className = inEdit? 'editing': '';
    className = hasCompleted? className + ' completed': className;

    return(
      <li
        className={className}
      >
        <div className='view'>
          {/* 勾选按妞 */}
          <input
            type='checkbox'
            className='toggle'
            checked={hasCompleted}
            onChange={() => {toggleTodoState(id)}}
          />
          <label 
            ref='label'
            onDoubleClick={this.onEdit}
          >
            {content}
          </label>
          {/* 删除按钮 */}
          <button
            className='destroy'
            ref='btn'
            onClick={() => {deleteTodo(id)}}
          ></button>
        </div>
        {/* 编辑TODO的输入框 */}
        <input
          type='text'
          className='edit'
          ref={this.editInput}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
        />
      </li>
    );
  }
}