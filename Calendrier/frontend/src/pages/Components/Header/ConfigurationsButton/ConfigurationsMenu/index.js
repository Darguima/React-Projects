import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouteMatch, Link } from "react-router-dom"

import calendrierApi from "../../../../../services/calendrierApi"

import './styles.css';

import { connect } from "react-redux"

const ConfigurationsMenu = ({userInfo, sessionInfo, setUserInfo, dispatch}) => {

  const [userId] = useState(useRouteMatch().params.userId)
  const [nickInput, setNickInput] = useState("")

  useEffect(() => {if (userInfo) setNickInput(userInfo.nickname)}, [userInfo])
  
  async function handleNickInputChange({target: {value}}){
    setNickInput(value)
  }
  
  // Handle with Enter/Esc press to close menu
  const closeMenu = useCallback(() => {
    dispatch({
      type: "CHANGE_SESSION_INFO_IS_CONFIGURATIONS_MENU_OPEN",
      newIsConfigurationsMenuOpen: false
    })
  }, [dispatch])

  const divInputRef = useRef()
  const deleteAccountButton = useRef()
  
  const handleChangeNickButtonPressed = useCallback(async () => {

    if (nickInput === userInfo.nickname){
      closeMenu()

      return
    }

    try{
    
      //Verify if the nickname already exists
      divInputRef.current.style.borderColor = "black"
      const response = await calendrierApi.get(`/usersByNick/${nickInput}`)

      if (response.data === ""){
        try{
          await calendrierApi.put(`/users/${userInfo._id}`, {...userInfo, nickname: nickInput})
          setUserInfo({...userInfo, nickname: nickInput})
          closeMenu()
        }

        catch(err){
          console.warn(err)
        }
      }

      else{
        divInputRef.current.style.borderColor = "red"
      }

    }

    catch(err){
      divInputRef.current.style.borderColor = "red"

      console.log("Don't worry: (I think)")
      console.warn(err)
    }
  }, [nickInput, closeMenu, userInfo, setUserInfo])


  const [reconfirmedDeletAccount, setReconfirmedDeletAccount] = useState(false)
  
  const handleDeleteAccountButtonPressed = async () => {

    if (!reconfirmedDeletAccount){
      deleteAccountButton.current.innerText = "Wait!"
      deleteAccountButton.current.style.backgroundColor = "rgb(255, 130, 0)" 
      
      setTimeout(() => {
        
        deleteAccountButton.current.addEventListener("mouseenter", () => {
          deleteAccountButton.current.style.backgroundColor = "red"
        })

        deleteAccountButton.current.addEventListener("mouseleave", () => {
          deleteAccountButton.current.style.backgroundColor = "#ececec"
        })


        deleteAccountButton.current.innerText = "Press me again to confirm!"
        deleteAccountButton.current.style.backgroundColor = "#ececec"
      }, 1000)

      setReconfirmedDeletAccount(true)
    }

    else{
      try{
        deleteAccountButton.current.innerText = "Press me again to confirm!"
        deleteAccountButton.current.style.backgroundColor = "rgb(255, 75, 0)"

        await calendrierApi.delete(`/users/${userInfo._id}`)

        alert("Conta eliminada com Sucesso")

        window.location.href = `/`
      }

      catch(err){
        console.warn(err)
      }
    }
  
  }


  useEffect(() => {
    function handleEnterOrEscKeyPress({key}){
      if (key === "Enter"){
        handleChangeNickButtonPressed()
      }

      if (key === "Escape"){
        closeMenu()
      }
    }

    document.addEventListener("keydown", handleEnterOrEscKeyPress)

    return () => {
      document.removeEventListener("keydown", handleEnterOrEscKeyPress)
    }
  }, [closeMenu, handleChangeNickButtonPressed])


  const prepareDateToEventManager = () => {
    closeMenu()
    
    dispatch({
      type: "CHANGE_EVENT_MANAGER",
      newYear: sessionInfo.year,
      newMonth: null,
      newDay: null,
    })
  }

  return (
    <div id="ConfigurationsMenuContainer">

      <section>
        <span>Nickname:</span> 

        <div id="inputContainer" ref={divInputRef}>

          <input 
            value={nickInput}
            onChange={handleNickInputChange}
            type="text"
            autoFocus={true}
          />
          <button id="changeNickButton" onClick={handleChangeNickButtonPressed}>

            <svg
              enableBackground="new 0 0 451.846 451.847;"
              viewBox="0 0 451.846 451.847"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
                L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
                c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"
              />
            </svg>

          </button>

        </div>

      </section>

      <section>

        <Link to={`/eventManager/${userId}`} onClick={prepareDateToEventManager}>

          <button id="manageEventsButton">Manage Events</button>

        </Link> 

      </section>

      <section>

        <button
          id="deleteAccountButton" 
          ref={deleteAccountButton}
          onClick={handleDeleteAccountButtonPressed}
        >
          Delete Account
        </button>

      </section>

    </div>
  )
}

export default connect(state => ({sessionInfo: state.sessionInfo}))(ConfigurationsMenu)
