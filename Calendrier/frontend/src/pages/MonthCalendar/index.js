import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom"

import Header from "../Components/Header";

import { MonthCalendarContainer, DayButtonsTableContainer, DayButtonsTr,  DayButton, Button } from './styles';

import DayEventCreator from "./Components/DayEventCreator"

import { connect } from "react-redux"

const MonthCalendar = ({sessionInfo, dispatch}) => {
  const [monthName] = useState(useRouteMatch().params.monthName)

  const [timeInfo, setTimeInfo] = useState({
    selectedYear: sessionInfo.year,
    selectedMonth: monthName,
    selectedDay: null,
  })

  // Number of days on the month
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


  const handleDayButtonPressed = (day) => {
    setTimeInfo({...timeInfo, selectedDay: Number(day)})

    dispatch({
      type: "CHANGE_ANY_MENU_TO_THE_SAME_STATE",
      newState: false
    })

    dispatch({
      type: "CHANGE_SESSION_INFO_IS_DAY_EVENT_CREATOR_OPENED",
      newIsDayEventCreatorOpened: true
    })
  }

  return (
  <>
  <Header/>
  

  <MonthCalendarContainer>
    <DayButtonsTableContainer>
    <tbody>
      {days.map((value_parent, index) => (
        <DayButtonsTr key={index} rowHeight={screenSizes.height / 5 /*4 = days.lenght*/
                                    /*5 because have the header in screenSizes.height*/}>
          {value_parent.map((value, index) => (
            <DayButton key={index}>
              <div className="ButtonContainer">
                <Button onClick={() => handleDayButtonPressed(value)}>
                  {value}
                </Button>
              </div>
            </DayButton>
          ))}
        </DayButtonsTr>
      ))}  
    </tbody>
    </DayButtonsTableContainer>
  </MonthCalendarContainer>

  {sessionInfo.isDayEventCreatorOpened &&
    <DayEventCreator 
      timeInfo={timeInfo}
    />
  }

  </>
  )
}


export default connect(state => ({sessionInfo: state.sessionInfo}))(MonthCalendar)