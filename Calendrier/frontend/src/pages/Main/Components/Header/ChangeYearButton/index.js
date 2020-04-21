import React from "react"

import ChangeYearMenu from "./ChangeYearMenu"

import "./styles.css"
import { connect } from "react-redux"

const ChangeYearButton = ({sessionInfo, dispatch}) => {
    
    const handleClickButton = () => {
        dispatch({
            type: "CHANGE_ANY_MENU_TO_THE_SAME_STATE",
            newState: false
        })

        dispatch({
            type: "CHANGE_SESSION_INFO_IS_CHANGE_YEAR_MENU_OPEN",
            newIsChangeYearMenuOpen: !sessionInfo.isChangeYearMenuOpen
        })
    }

    return(
        <div id="changeYearContainer">
            <span>{sessionInfo.year}</span>
            <button id="changeYearButton" onClick={handleClickButton}>
                <svg
                    id="Layer_1"
                    enableBackground="new 0 0 512 512"
                    viewBox="0 0 451.847 325.00"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    space="preserve"
                >
                    <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
                </svg>
            </button>

            {sessionInfo.isChangeYearMenuOpen && 
                <ChangeYearMenu />
            }
        </div>
    )
}

export default connect(state => ({sessionInfo: state.sessionInfo}))(ChangeYearButton)
