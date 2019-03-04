import React, {Component} from 'react'

export default class Img extends Component {
  render(){
    return(
      <img src={this.props.img} alt='' />
    )
  }
}