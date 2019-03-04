import React, {Component} from 'react'

export default class Nav extends Component{
  change(e){
    console.log('xxxxxxxxx',e.target.dataset.index);
    this.props.click(e.target.dataset.index);
  }
  render(){
    return(
      <nav className='nav'>
        {
          this.props.data.map((item, index) => {
            return(
              <a
              href = 'javascript:;'
              className={index == this.props.show? 'active': ''}
              key={index}
              data-index={index}
              onClick={this.change.bind(this)}>
                {item.txt}
              </a>
            );
          })
        }
      </nav>
    );
  }
}