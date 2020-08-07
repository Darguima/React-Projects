import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from "react-router-dom"

import Header from "../Components/Header";

import { MonthCalendarContainer, DayButtonsTableContainer, DayButtonsTr,  DayButton, Button } from './styles';

import DayEventCreator from "./Components/DayEventCreator"
import EventSpace from "./Components/EventSpace"

import calendrierApi from "../../services/calendrierApi"
import { connect } from "react-redux"

const MonthCalendar = ({sessionInfo, dispatch}) => {
  const [monthName] = useState(useRouteMatch().params.monthName)

  const [timeInfo, setTimeInfo] = useState({
    selectedYear: sessionInfo.year,
    selectedMonth: monthName,
    selectedDay: null,
  })

  const [userId] = useState(useRouteMatch().params.userId)
  const [eventsOfTheMonth, setEventsOfTheMonth] = useState([])
  
  useEffect(() => {
    async function fetchData() {
    
      try{
        const {data} = await calendrierApi.get(`/users/${userId}`)
        const eventsArray = []

        data.events.map(item => {
          if (item.year === sessionInfo.year && item.month === monthName){
            eventsArray.push(item)
          }

          setEventsOfTheMonth([...eventsArray])

          return item //Only to the React don't warn

        })
      }

      catch(err){
        console.error(err)
        alert("Erro - A reiniciar pagina")

        window.location.href = `/`
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

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

  const refreshEventList = async () => {
    
    try{
      const {data} = await calendrierApi.get(`/users/${userId}`)
      const eventsArray = []

      data.events.map(item => {
        if (item.year === sessionInfo.year && item.month === monthName){
          eventsArray.push(item)
        }

        setEventsOfTheMonth([...eventsArray])

        return item //Only to the React don't warn

      })
    }

    catch(err){
      console.error(err)
      alert("Erro - A reiniciar pagina")

      window.location.href = `/`
    }
  }

  const prepareDateToEventManager = (day) => {
    dispatch({
      type: "CHANGE_EVENT_MANAGER",
      newYear: sessionInfo.year,
      newMonth: monthName,
      newDay: day,
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

                <Link to={`/eventManager/${userId}`} onClick={() => {prepareDateToEventManager(value)}}>
                  <EventSpace day={value} eventsOfTheMonth={eventsOfTheMonth}/>
                </Link>
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
      refreshEventList={refreshEventList}
    />
  }

  </>
  )
}


export default connect(state => ({sessionInfo: state.sessionInfo}))(MonthCalendar)