import React, { useState, useEffect, useCallback } from 'react';

import calendrierApi from "../../../../../../services/calendrierApi"

import './styles.css';
import { connect } from 'react-redux';

const ConfigurationsMenu = ({userInfo, dispatch, isMenuClosing}) => {
  const [nickInput, setNickInput] = useState({value: userInfo.nickname, newNickIsValid: true, initialNick: ""})

  useEffect(() => {
    setNickInput({...nickInput, initialNick: userInfo.nickname})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  async function handleNickInputChange({target: {value, style}}){

    try{
      var userWithSameNickInfo = await calendrierApi.get(`/usersByNick/${value}`)
    }

    catch(err){
      console.log("An error has occurred - perhaps a passive error:")
      console.warn(err)

      setNickInput({...nickInput, value, newNickIsValid: false})
      style.borderColor = "red"

      return
    }

    if (userWithSameNickInfo.data !== "" && value !== nickInput.initialNick){
      setNickInput({...nickInput, value, newNickIsValid: false})
      style.borderColor = "red"
    }

    else{
      setNickInput({...nickInput, value, newNickIsValid: true})
      style.borderColor = "green"
    }
  }

  // Handle with Enter/Esc press to close menu

  // Variable to save the data on the server
  const [isDataReadyToUpload, setIsDataReadyToUpload] = useState({value: false})


  const closeMenu = useCallback(() => {
    dispatch({
      type: "CHANGE_SESSION_INFO_IS_CONFIGURATIONS_MENU_OPEN",
      newIsConfigurationsMenuOpen: false
    })
  }, [dispatch])

  useEffect(() => {
    function handleEnterOrEscKeyPress({key}){
      if (key === "Enter" || key === "Escape"){
        
        setIsDataReadyToUpload({value: true})
        closeMenu()
      }
    }

    document.addEventListener("keydown", handleEnterOrEscKeyPress)

    return () => {
      document.removeEventListener("keydown", handleEnterOrEscKeyPress)
    }
  }, [closeMenu])

  // Handle with buttonConfig press to close menu

  useEffect(() => {
    setIsDataReadyToUpload({value: isMenuClosing})
  }, [isMenuClosing])

  // Handle with the menu exit to save the data in the server

  const saveNewNickOnTheServer = async () => {
    if (nickInput.newNickIsValid && nickInput.value !== nickInput.initialNick){
      await calendrierApi.put(`users/${userInfo._id}`, {nickname: nickInput.value})

      dispatch({
        type: "CHANGE_USER_DATA_NICK",
        newNickname: nickInput.value
      })
    }
  }

  useEffect(() => {
    if (isDataReadyToUpload){
      saveNewNickOnTheServer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataReadyToUpload, isMenuClosing])

  return (
    <div id="ConfigurationsMenuContainer">

      <section>
        <span>Nickname:</span> 
        <input 
          value={nickInput.value}
          onChange={handleNickInputChange}
          type="text"
          autoFocus={true}
        />
      </section>

      <section>

        <button id="manageEventsButton">Manage Events</button>

      </section>

      <section>

        <button id="deleteAccountButton">Delete Account</button>

      </section>

    </div>
  )
}

export default connect(state => ({userInfo: state.userInfo}))(ConfigurationsMenu)
