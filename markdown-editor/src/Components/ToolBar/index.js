import React from "react"

import { WriteButton, PreviewButton, TitleButton, BoldButton, ItalicButton, StrikeTextButton, LinkButton, CommentButton, SourceCodeButton, ImgButton, PointListButton, NumListButton, CheckBoxButton } from "./Components/Buttons"

import "./styles.css"

export default class ToolBar extends React.Component{
    state = {
        writingMode: true,
    }

    handleClick = writingMode => {
        this.setState({writingMode}, () => {this.props.changeMenuFunction(writingMode)})
    }

    buttonAction = actionCode => {
        this.props.changeActionFunction(actionCode)
    }


    render(){
        return(
            <div id="containerToolBar">
                <div id="cointainerActionButtons">
                    <div className="ButtonGroup">
                        <WriteButton updateState={this.handleClick}/>
                        <PreviewButton updateState={this.handleClick} buttonAction={this.buttonAction}/>
                    </div>
                </div>

                {this.state.writingMode &&
                    <div id="cointanerStyleButtons">
                        <div className="ButtonGroup">
                            <TitleButton buttonAction={this.buttonAction} toggleTitleMenu={this.props.toggleTitleMenu}
                             closeTitleMenu={this.props.closeTitleMenu}/>
                            <BoldButton buttonAction={this.buttonAction}/>
                            <ItalicButton buttonAction={this.buttonAction}/>
                            <StrikeTextButton buttonAction={this.buttonAction}/>
                        </div>

                        <div className="ButtonGroup">
                            <LinkButton buttonAction={this.buttonAction}/>
                            <CommentButton buttonAction={this.buttonAction}/>
                            <SourceCodeButton buttonAction={this.buttonAction}/>
                            <ImgButton buttonAction={this.buttonAction}/>
                        </div>

                        <div className="ButtonGroup">
                            <PointListButton buttonAction={this.buttonAction}/>
                            <NumListButton buttonAction={this.buttonAction}/>
                            <CheckBoxButton buttonAction={this.buttonAction}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
} 
