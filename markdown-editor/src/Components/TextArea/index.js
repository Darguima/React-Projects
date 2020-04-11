import React from "react"
import MDReactComponent from 'markdown-react-js'

import { title, bold, italic, strike, link, comment, sourceCode, image, pointList, numList, checkBox} from "./Functions"


import "./styles.css"

export default class TextArea extends React.Component{

    constructor(props){
        super(props)

        this.textArea = React.createRef()
    }

    state = {
        writingMode: true,
        text: ""
    }

    textAreaChange = event => {
        this.setState({text: event.target.value})
    }

    componentDidUpdate(){
        const actionCode = this.props.actionCode

        if (actionCode){
            var text = this.state.text

            if (actionCode.slice(0, 11) === "TitleButton"){
                text = title(text, this.textArea.current, actionCode[11])
            }

            if (actionCode === "BoldButton"){
                text = bold(text, this.textArea.current)
            }

            if (actionCode === "ItalicButton"){
                text = italic(text, this.textArea.current)
            }

            if (actionCode === "StrikeTextButton"){
                text = strike(text, this.textArea.current)
            }

            if (actionCode === "LinkButton"){
                text = link(text, this.textArea.current)
            }

            if (actionCode === "CommentButton"){
                text = comment(text, this.textArea.current)
            }

            if (actionCode === "SourceCodeButton"){
                text = sourceCode(text, this.textArea.current)
            }

            if (actionCode === "ImgButton"){
                text = image(text, this.textArea.current)
            }

            if (actionCode === "PointListButton"){
                text = pointList(text, this.textArea.current)
            }
            
            if (actionCode === "NumListButton"){
                text = numList(text, this.textArea.current)
            }

            if (actionCode === "CheckBoxButton"){
                text = checkBox(text, this.textArea.current)
            }

            //     Change the actionCode to null, upgrade the state.text
            this.props.changeActionFunction(null, this.setState({text}))
        }
    }

    render(){
        return(
            <div id="containerTextArea">
                {this.props.writingMode && <textarea id="textArea" value={this.state.text} onChange={this.textAreaChange} ref={this.textArea} wrap="off" autoFocus></textarea>}
                {!this.props.writingMode && <div id="textArea"><MDReactComponent text={this.state.text} /></div>}
            </div>
        )
    }
}
