import React from 'react';

import { connect } from "react-redux"

import './styles.css';

class Months extends React.Component{
  constructor(props){
    super(props)
    this.userInfo = this.props.userInfo
  }

  componentDidUpdate(){
    this.userInfo = this.props.userInfo
  }

  render(){
    return(
      <div id="monthsContainer">
        <p>meses de 2020</p>
        <p>{this.userInfo.nickname}</p>
      </div>
    )
  }
}

export default connect(state => ({userInfo: state}))(Months)
