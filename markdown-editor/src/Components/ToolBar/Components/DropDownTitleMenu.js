import React from "react"

import "./DropDownTitleMenu.css"

export default class DropDownTitleMenu extends React.Component{

    pressedButton = number => {
        this.props.changeActionFunction("TitleButton" + number)
        this.props.closeTitleMenu()
    }

    handleClickTitle1Button = () => {
        this.pressedButton(1)
    }

    handleClickTitle2Button = () => {
        this.pressedButton(2)
    }

    handleClickTitle3Button = () => {
        this.pressedButton(3)
    }

    handleClickTitle4Button = () => {
        this.pressedButton(4)
    }

    handleClickTitle5Button = () => {
        this.pressedButton(5)
    }

    handleClickTitle6Button = () => {
        this.pressedButton(6)
    }
    
    render(){
        return(
            <div id="containerTitleButtons">
                <button className="TitleButton" onClick={this.handleClickTitle1Button}>Header 1</button>
                <button className="TitleButton" onClick={this.handleClickTitle2Button}>Header 2</button>
                <button className="TitleButton" onClick={this.handleClickTitle3Button}>Header 3</button>
                <button className="TitleButton" onClick={this.handleClickTitle4Button}>Header 4</button>
                <button className="TitleButton" onClick={this.handleClickTitle5Button}>Header 5</button>
                <button className="TitleButton" onClick={this.handleClickTitle6Button}>Header 6</button>
            </div>
        )
    }
}
