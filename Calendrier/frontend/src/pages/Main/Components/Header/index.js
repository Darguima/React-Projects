import React from "react"

import ConfigurationsButton from "./ConfigurationsButton"
import ChangeYearButton from "./ChangeYearButton"

import "./styles.css"

export default class Header extends React.Component{
    render(){
        return(
            <header>
                <ConfigurationsButton />
                Calendrier
                2020
                <ChangeYearButton />
            </header>
        )
    }
}
