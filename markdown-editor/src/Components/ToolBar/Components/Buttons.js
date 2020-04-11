import React from "react"

import "./ButtonStyles.css"

class WriteButton extends React.Component{
    pressedButton = () => {
        this.props.updateState(true)
    }

    render(){
        return(
            <button className="ActionsButton" onClick={this.pressedButton}>Write</button>
        )
    }
}

class PreviewButton extends React.Component{
    pressedButton = () => {
        this.props.updateState(false)
        this.props.buttonAction(null)
    }

    render(){
        return(
            <button className="ActionsButton" onClick={this.pressedButton}>Preview</button>
        )
    }
}

class TitleButton extends React.Component{

    toggleTitleMenu = () => this.props.toggleTitleMenu()

    render(){
        return(
            <button className="StyleButton" onClick={this.toggleTitleMenu}>
                <svg 
                    aria-hidden="true"
                    data-prefix="fas"
                    role="img" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512" 
                    data-fa-i2svg=""
                >
                    <path fill="currentColor" d="M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z"></path>
                </svg>
            </button>
        )
    }
}

class BoldButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("BoldButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1" 
                    enableBackground="new 0 0 467.765 467.765" 
                    viewBox="0 0 467.765 467.765" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m360.345 233.882c29.835-24.139 48.949-61.04 48.949-102.324 0-72.545-59.013-131.558-131.559-131.558h-219.264v58.471h29.235v350.824h-29.235v58.471h219.265c72.546 0 131.559-59.013 131.559-131.559-.001-41.285-19.115-78.186-48.95-102.325zm-82.61 175.412h-131.559v-146.176h131.559c40.299 0 73.088 32.79 73.088 73.088s-32.789 73.088-73.088 73.088zm0-204.647h-131.559v-146.176h131.559c40.299 0 73.088 32.79 73.088 73.088s-32.789 73.088-73.088 73.088z"/>
                </svg>
            </button>
        )
    }
}

class ItalicButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("ItalicButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1"
                    enableBackground="new 0 0 467.765 467.765"
                    viewBox="0 0 467.765 467.765"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m409.294 58.471v-58.471h-175.412v58.471h43.373l-150.352 350.823h-68.432v58.471h175.412v-58.471h-43.373l150.351-350.823z"/>
                </svg>
            </button>
        )
    }
}


class StrikeTextButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("StrikeTextButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1"
                    enableBackground="new 0 0 467.765 467.765" 
                    viewBox="0 0 467.765 467.765" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m165.462 175.412c-11.968-12.548-19.286-29.342-19.286-47.679 0-38.186 31.077-69.263 69.263-69.263h164.62v-58.47h-164.62c-70.433 0-127.733 57.3-127.733 127.733 0 16.809 3.578 32.82 9.566 47.679z"/>
                    <path d="m302.303 292.353c11.968 12.548 19.286 29.342 19.286 47.679 0 38.186-31.077 69.263-69.262 69.263h-164.621v58.471h164.62c70.433 0 127.733-57.3 127.733-127.733 0-16.809-3.576-32.822-9.564-47.679-.001-.001-68.192-.001-68.192-.001z"/>
                    <path d="m58.471 204.647h350.824v58.471h-350.824z"/>
                </svg>
            </button>
        )
    }
}

class LinkButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("LinkButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1"
                    enableBackground="new 0 0 515.556 515.556" 
                    viewBox="0 0 515.556 515.556" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m392.189 0c-32.946 0-63.926 12.839-87.227 36.14l-96.067 96.067c7.342-1.025 14.677-2.138 22.182-2.138 20.693 0 40.97 4.02 59.611 11.474l59.839-59.839c11.139-11.124 25.929-17.26 41.662-17.26 32.49 0 58.922 26.432 58.922 58.922 0 15.734-6.136 30.523-17.26 41.662l-107.71 107.712c-22.279 22.247-61.046 22.263-83.325.016l-45.533 45.596c23.286 23.27 54.265 36.093 87.195 36.093 32.946 0 63.925-12.839 87.227-36.14l107.712-107.712c23.301-23.301 36.14-54.281 36.14-87.227-.001-68.031-55.336-123.366-123.368-123.366z"/>
                    <path d="m224.303 374.578-59.274 59.274c-11.139 11.124-25.929 17.26-41.662 17.26-32.49 0-58.922-26.432-58.922-58.922 0-15.733 6.136-30.523 17.26-41.662l107.712-107.712c22.279-22.247 61.046-22.263 83.325-.016l45.533-45.596c-46.587-46.54-127.819-46.555-174.422.047l-107.713 107.712c-23.302 23.301-36.14 54.28-36.14 87.226 0 68.032 55.335 123.366 123.366 123.366 32.946 0 63.925-12.839 87.227-36.14l94.792-94.792c-6.921.93-13.806 2.043-20.908 2.043-21.012.001-41.363-4.2-60.174-12.088z"/>
                </svg>
            </button>
        )
    }
}

class CommentButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("CommentButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1"
                    enableBackground="new 0 0 409.294 409.294"
                    viewBox="0 0 409.294 409.294"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m233.882 29.235v175.412h116.941c0 64.48-52.461 116.941-116.941 116.941v58.471c96.728 0 175.412-78.684 175.412-175.412v-175.412z"/>
                    <path d="m0 204.647h116.941c0 64.48-52.461 116.941-116.941 116.941v58.471c96.728 0 175.412-78.684 175.412-175.412v-175.412h-175.412z"/>
                </svg>
            </button>
        )
    }
}

class SourceCodeButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("SourceCodeButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg
                    id="Capa_1"
                    enableBackground="new 0 0 467.765 467.765"
                    viewBox="0 0 467.765 467.765"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m146.175 87.707-146.175 146.176 146.175 146.175 41.34-41.34-104.834-104.835 104.834-104.836z"/>
                    <path d="m321.59 87.707-41.34 41.34 104.834 104.836-104.834 104.834 41.34 41.34 146.175-146.175z"/>
                </svg>
            </button>
        )
    }
}

class ImgButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("ImgButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1" 
                    enableBackground="new 0 0 488.471 488.471" 
                    viewBox="0 0 488.471 488.471" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m457.941 61.059h-427.412c-16.859 0-30.529 13.67-30.529 30.529v305.294c0 16.86 13.67 30.529 30.529 30.529h427.412c16.86 0 30.529-13.67 30.529-30.529v-305.294c.001-16.859-13.669-30.529-30.529-30.529zm-396.882 61.059h366.353v213.706l-122.118-122.118-152.647 152.647h-91.588z"/>
                    <path d="m200.293 166.06c17.884 17.884 17.884 46.879 0 64.763s-46.879 17.884-64.763 0-17.884-46.879 0-64.763 46.879-17.884 64.763 0"/>
                </svg>
            </button>
        )
    }
}

class PointListButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("PointListButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    id="Capa_1" 
                    enableBackground="new 0 0 374.706 374.706" 
                    viewBox="0 0 374.706 374.706" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path id="path-1_59_" d="m80.294 53.529h294.412v53.529h-294.412z" transform="translate(4 3)"/>
                    <path d="m80.294 160.588h267.647v53.529h-267.647z"/>
                    <path id="path-1_58_" d="m80.294 267.647h294.412v53.529h-294.412z" transform="translate(4 11)"/>
                    <path id="path-2_11_" d="m0 53.529h53.529v53.529h-53.529z" transform="translate(1 3)"/>
                    <path id="path-2_10_" d="m0 160.588h53.529v53.529h-53.529z" transform="translate(1 7)"/>
                    <path id="path-2_9_" d="m0 267.647h53.529v53.529h-53.529z" transform="translate(1 11)"/>
                </svg>
            </button>
        )
    }
}

class NumListButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("NumListButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg
                    viewBox="0 -10 490.66667 490" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    
                    <path d="m48 171h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32c2.945312 0 5.332031 2.390625 5.332031 5.332031v5.335938c0 2.941406-2.386719 5.332031-5.332031 5.332031h-10.667969c-20.585937 0-37.332031 16.746094-37.332031 37.332031v26.667969c0 8.832031 7.167969 16 16 16h53.332031c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-37.332031v-10.667969c0-2.941406 2.390625-5.332031 5.332031-5.332031h10.667969c20.585938 0 37.332031-16.746094 37.332031-37.332031v-5.335938c0-20.585937-16.746093-37.332031-37.332031-37.332031zm0 0"/>
                    <path d="m48 341.667969h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32c2.945312 0 5.332031 2.386719 5.332031 5.332031v5.332031c0 2.945313-2.386719 5.335938-5.332031 5.335938h-21.332031c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h21.332031c2.945312 0 5.332031 2.386719 5.332031 5.332031v5.332031c0 2.945313-2.386719 5.335938-5.332031 5.335938h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32c20.585938 0 37.332031-16.746094 37.332031-37.335938v-5.332031c0-7.9375-2.539062-15.273438-6.78125-21.332031 4.242188-6.058594 6.78125-13.398438 6.78125-21.335938v-5.332031c0-20.585938-16.746093-37.332031-37.332031-37.332031zm0 0"/>
                    <path d="m16 32.332031h16v80c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-96c0-8.832031-7.167969-16-16-16h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16zm0 0"/>
                    <path d="m149.332031 85.667969h320c11.796875 0 21.335938-9.539063 21.335938-21.335938s-9.539063-21.332031-21.335938-21.332031h-320c-11.796875 0-21.332031 9.535156-21.332031 21.332031s9.535156 21.335938 21.332031 21.335938zm0 0"/>
                    <path d="m469.332031 213.667969h-320c-11.796875 0-21.332031 9.535156-21.332031 21.332031s9.535156 21.332031 21.332031 21.332031h320c11.796875 0 21.335938-9.535156 21.335938-21.332031s-9.539063-21.332031-21.335938-21.332031zm0 0"/>
                    <path d="m469.332031 384.332031h-320c-11.796875 0-21.332031 9.539063-21.332031 21.335938s9.535156 21.332031 21.332031 21.332031h320c11.796875 0 21.335938-9.535156 21.335938-21.332031s-9.539063-21.335938-21.335938-21.335938zm0 0"/>
                </svg>
            </button>
        )
    }
}

class CheckBoxButton extends React.Component{
    pressedButton = () => {
        this.props.buttonAction("CheckBoxButton")
    }

    render(){
        return(
            <button className="StyleButton" onClick={this.pressedButton}>
                <svg 
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m452 512h-392c-33.085938 0-60-26.914062-60-60v-392c0-33.085938 26.914062-60 60-60h392c33.085938 0 60 26.914062 60 60v392c0 33.085938-26.914062 60-60 60zm-392-472c-11.027344 0-20 8.972656-20 20v392c0 11.027344 8.972656 20 20 20h392c11.027344 0 20-8.972656 20-20v-392c0-11.027344-8.972656-20-20-20zm370.898438 111.34375-29.800782-26.6875-184.964844 206.566406-107.351562-102.046875-27.558594 28.988281 137.21875 130.445313zm0 0"/>
                </svg>
            </button>
        )
    }
}

export { WriteButton, PreviewButton, TitleButton, BoldButton, ItalicButton, StrikeTextButton, LinkButton, CommentButton, SourceCodeButton, ImgButton, PointListButton, NumListButton, CheckBoxButton }
