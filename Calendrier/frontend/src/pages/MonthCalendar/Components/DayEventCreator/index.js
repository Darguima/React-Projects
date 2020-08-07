import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from "react-router-dom"

import { Container, TableContainer, DayEventCreatorRow, TextColumn, InputColumn, Button, ExitText, ExitButton } from './styles';

import calendrierApi from "../../../../services/calendrierApi"

import { connect } from "react-redux"

const DayEventCreator = ({timeInfo, refreshEventList, dispatch}) => {

  const [eventUploaded, setEventUploaded] = useState(false)

  const [nameInputRef] = useState(useRef())

  const [userId] = useState(useRouteMatch().params.userId)
  const [userInfo, setUserInfo] = useState()
  
  useEffect(() => {
    async function fetchData() {
    
      try{
        const {data} = await calendrierApi.get(`/users/${userId}`)
        setUserInfo(data)
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

  const [nameInput, setNameInput] = useState();
  const [timeInput, setTimeInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();

  const handleInputChange = ({target: {value}}, setState) => setState(value)

  const handleCancelButtonPress = () => {
    dispatch({
      type: "CHANGE_ANY_MENU_TO_THE_SAME_STATE",
      newState: false
    })

    dispatch({
      type: "CHANGE_SESSION_INFO_IS_DAY_EVENT_CREATOR_OPENED",
      newIsDayEventCreatorOpened: false
    })
  }

  const handleCreateButtonPress = async () => {

    const eventInfo = {
        year: timeInfo.selectedYear,
        month: timeInfo.selectedMonth,
        day: timeInfo.selectedDay,

        name: nameInput,
        time: timeInput,
        description: descriptionInput
    }

    if (!eventInfo.time || eventInfo.time===""){
      eventInfo.time = "12:00"
    }

    if (!eventInfo.name || eventInfo.name === ""){
      nameInputRef.current.style.borderColor = "red";
    }

    else{
      userInfo.events.push(eventInfo)

      try{
        await calendrierApi.put(`/users/${userInfo._id}`, userInfo)

        setEventUploaded(true)
      }

      catch(err){
        console.warn(err)
      }
    }

  }

  return (
    <Container>

      {!eventUploaded &&

      <>

      <div id="titleDiv">
        <span>Create Event on {timeInfo.selectedMonth} {timeInfo.selectedDay}, {timeInfo.selectedYear}</span>
      </div>

      <TableContainer><tbody>

      <DayEventCreatorRow>
      
        <TextColumn>
          <span>Name:</span>
        </TextColumn>

        <InputColumn>
          <input 
            ref={nameInputRef}
            id="inputName"
            onChange={(event) => handleInputChange(event, setNameInput)}
            autoFocus={true}
          />
        </InputColumn>

      </DayEventCreatorRow>

      <DayEventCreatorRow>

        <TextColumn>
          <span>Hour:</span>
        </TextColumn>

        <InputColumn>
          <input
            type="time"
            id="inputTime"
            onChange={(event) => handleInputChange(event, setTimeInput)}
          />
        </InputColumn>

      </DayEventCreatorRow>

      <DayEventCreatorRow>

        <TextColumn>
          <span>Description:</span>
        </TextColumn>

        <InputColumn>
          <textarea 
            onChange={(event) => handleInputChange(event, setDescriptionInput)}
          />
        </InputColumn>

      </DayEventCreatorRow>

      </tbody></TableContainer>

      <div id="buttonsDiv">
        <Button 
          onClick={handleCancelButtonPress}
        >
          <span>Cancel</span>
        </Button>

      
        <Button
          onClick={handleCreateButtonPress}
        >
          <span>Create</span>
        </Button>

      </div>
        
      </>

      }

      {eventUploaded &&
      <>
        <ExitText><span>The new event was uploaded.<br/>Check "Manage Events".</span></ExitText>

        <ExitButton>
          <button
            onClick={() => {
            dispatch({
              type: "CHANGE_ANY_MENU_TO_THE_SAME_STATE",
              newState: false
            })

            refreshEventList()
          }}
          >
            Exit
          </button>
        </ExitButton>
      </>
      }

    </Container>
  );
}

export default connect(state => ({ sessionInfo : state.sessionInfo}))(DayEventCreator)
