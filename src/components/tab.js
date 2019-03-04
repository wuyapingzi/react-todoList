import React, {Component,} from 'react';
import Nav from './tab/nav.js'
import Img from './tab/img.js'

const data = [
  {
    txt: "图片一",
    img: "/static/img/1.png"
  },{
    txt: "图片二",
    img: "/static/img/2.png"
  },{
    txt: "图片三",
    img: "/static/img/3.png"
  },{
    txt: "图片四",
    img: "/static/img/4.png"
  },{
    txt: "图片五",
    img: "/static/img/5.png"
  }
];
export default class Tab extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      show: 0,/*记录当前应显示第几个tab */
      data,
    }
    this.changeShow = this.changeShow.bind(this);
  }
  changeShow(index){
    this.setState({
      show: index
    })
  }
  render(){
    return(
      <div className='tab'>
        <Nav
          data={this.state.data}
          show={this.state.show}
          click={this.changeShow}
        />
        <Img
          img={this.state.data[this.state.show].img}
        />
      </div>
    );
  }
}