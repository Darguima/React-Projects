import React from 'react';

import ToolBar from "./Components/ToolBar"
import DropDownTitleMenu from "./Components/ToolBar/Components/DropDownTitleMenu"
import TextArea from "./Components/TextArea"

import './App.css';

export default class App extends React.Component {

  state = {
    writingMode: true,
    actionCode: null,
    isTitleMenuOpen: false,
  }

  changeMenu = writingMode => {
    this.setState({writingMode}, () => this.render())
  }

  changeAction = (actionCode, callback= () => {}) => {
    this.setState({actionCode}, () => this.render())
    callback()
  }

  toggleTitleMenu = () => {
    this.setState({isTitleMenuOpen: !this.state.isTitleMenuOpen})
  }

  closeTitleMenu = () => {
    this.setState({isTitleMenuOpen: false})
  }


  render(){
    return (
      <div className="App">
        
        <ToolBar changeMenuFunction={this.changeMenu} changeActionFunction={this.changeAction} toggleTitleMenu={this.toggleTitleMenu}
         closeTitleMenu={this.closeTitleMenu}/>

        {this.state.isTitleMenuOpen && <DropDownTitleMenu changeActionFunction={this.changeAction} closeTitleMenu={this.closeTitleMenu}/>}

        <TextArea writingMode={this.state.writingMode} actionCode={this.state.actionCode} changeActionFunction={this.changeAction}/>

      </div>
    );
  }
}


