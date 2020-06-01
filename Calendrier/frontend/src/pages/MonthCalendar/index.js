import React from 'react';

import Header from "../Components/Header";

import { MonthCalendarContainer, DayButtonsTableContainer, DayButtonsTr,  DayButton } from './styles';

import { connect } from "react-redux"

const MonthCalendar = props => {
  const {sessionInfo} = props

  // Number of days on the month

  const {monthName} = props.match.params

  var daysOfMonth

  if (monthName === "January"){
    daysOfMonth = 31
  }
  
  if (monthName === "February"){
    if ((sessionInfo.year % 4 === 0 && sessionInfo.year % 100 !== 0) || sessionInfo.year % 400 === 0){
      daysOfMonth = 29
    }
    else{
      daysOfMonth = 28
    }
  }

  if (monthName === "March"){
    daysOfMonth = 31
  }

  if (monthName === "April"){
    daysOfMonth = 30
  }

  if (monthName === "May"){
    daysOfMonth = 31
  }

  if (monthName === "June"){
    daysOfMonth = 30
  }

  if (monthName === "July"){
    daysOfMonth = 31
  }

  if (monthName === "August"){
    daysOfMonth = 31
  }

  if (monthName === "September"){
    daysOfMonth = 30
  }

  if (monthName === "October"){
    daysOfMonth = 31
  }

  if (monthName === "November"){
    daysOfMonth = 30
  }

  if (monthName === "December"){
    daysOfMonth = 31
  }

  // Screen Size

  const screenSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    componentHeight: null,
  }

  screenSizes.componentHeight = screenSizes.height * 0.07 <= 30 ? screenSizes.height - 30 : screenSizes.height * 0.93

  // Array with the days
  var days = []
  var rowNumbers
  var columnsNumber

  if (screenSizes.width < screenSizes.height){
    columnsNumber = 3

    rowNumbers = daysOfMonth / columnsNumber

    if (daysOfMonth % rowNumbers !== 0){
      rowNumbers = Math.floor(rowNumbers) + 1
    }
  }

  else{
    rowNumbers = 4
    columnsNumber = daysOfMonth / rowNumbers

    if (daysOfMonth % rowNumbers !== 0){
      columnsNumber = Math.floor(columnsNumber) + 1
    }
  }

  let actualDay = 0
  for (let row = 0; row < rowNumbers; row++){

    let column = []

    for (let columnNum = 0; columnNum < columnsNumber; columnNum++){
      actualDay++
      if (actualDay <= daysOfMonth)
        column.push(actualDay)
    }

    days.push(column)
  }

  return (
  <>
  <Header userId={props.match.params.userId}/>

  <MonthCalendarContainer>
    <DayButtonsTableContainer>
    <tbody>
      {days.map((value_parent, index) => (
        <DayButtonsTr key={index} rowHeight={screenSizes.height / 5 /*4 = days.lenght*/
                                    /*5 because have the header in screenSizes.height*/}>
          {value_parent.map((value, index) => (
            <DayButton key={index}>
              <div className="LinkContainer">
                {/*<Link to={`/month/January/${userInfo._id}`}> January </Link>*/}
                {value}
              </div>
            </DayButton>
          ))}
        </DayButtonsTr>
      ))}  
    </tbody>
    </DayButtonsTableContainer>
  </MonthCalendarContainer>
  </>
  )
}


export default connect(state => ({sessionInfo: state.sessionInfo}))(MonthCalendar)