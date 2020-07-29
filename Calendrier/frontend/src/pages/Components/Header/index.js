import React from "react"
import { useRouteMatch } from "react-router-dom"

import ConfigurationsButton from "./ConfigurationsButton"
import ChangeYearButton from "./ChangeYearButton"

import {Link} from "react-router-dom"

import "./styles.css"

const Header = () => {
    return(
        <header>
            <ConfigurationsButton id="configurationsButton"/>
            <ChangeYearButton id="changeYearButton"/>
            <div id="siteName">
                <Link to={`/mainPage/${useRouteMatch().params.userId}`}> <span>Calendrier</span> </Link>
            </div>
        </header>
    )
}

export default Header
