import React from "react"

import ConfigurationsButton from "./ConfigurationsButton"
import ChangeYearButton from "./ChangeYearButton"

import {Link} from "react-router-dom"

import "./styles.css"

const Header = props => {
    const {userId} = props

    return(
        <header>
            <ConfigurationsButton id="configurationsButton"/>
            <ChangeYearButton id="changeYearButton"/>
            <div id="siteName">
                <Link to={`/mainPage/${userId}`}> <span>Calendrier</span> </Link>
            </div>
        </header>
    )
}

export default Header
