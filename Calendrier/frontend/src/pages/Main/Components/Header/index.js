import React from "react"

import ConfigurationsButton from "./ConfigurationsButton"
import ChangeYearButton from "./ChangeYearButton"

import "./styles.css"

const Header = () => {
    return(
        <header>
            <ConfigurationsButton id="configurationsButton"/>
            <ChangeYearButton id="changeYearButton"/>
            <div id="siteName">
                <span>Calendrier</span>
            </div>
        </header>
    )
}

export default Header
