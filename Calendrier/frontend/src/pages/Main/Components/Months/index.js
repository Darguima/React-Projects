import React from 'react';

import { connect } from "react-redux"

import './styles.css';

const Months = ({sessionInfo}) => {
  return(
    <div id="monthsContainer">
      <p>meses de {sessionInfo.year}</p>
    </div>
  )
}

export default connect(state => ({sessionInfo: state.sessionInfo}))(Months)
