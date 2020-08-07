import React from "react"

import calendrierApi from "../../services/calendrierApi"

import "./styles.css"

export default class Login extends React.Component{

    state = {
        textNick: ""
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleClickKey)
    }

    handleInputChange = ({ target }) => {
        this.setState({textNick: target.value})
    }

    handleClickKey = (event) => {
        if (event.key === "Enter")
            this.login(this.state.textNick)
    }

    handleClickButton = () => this.login(this.state.textNick)

    login = async nick => {
        try{
            var userInfo = await calendrierApi.get(`usersByNick/${nick}`)
        }
        catch(err){
            console.error(err)
            alert("Erro - A reiniciar pagina")

            window.location.href = `/`
        }

        // The user haven't account in the database
        if (userInfo.data === ""){
            userInfo = await calendrierApi.post("/users", {"nickname": nick})
            let userId = userInfo.data._id
            window.location.href = `/mainPage/${userId}`
        }

        // The user have account in the database
        else{
            let userId = userInfo.data._id
            window.location.href = `/mainPage/${userId}`
        }

    }

    render(){
        return(
            <div id="page">
                <div id="loginContainer">

                    <img id="logo" src={"/logo.png"} alt="logo" />

                    <input type="text" 
                        placeholder="Nickname" 
                        value={this.state.textNick}
                        onChange={this.handleInputChange} 
                        autoFocus
                    />

                    <button onClick={this.handleClickButton}>Login</button>

                </div>
            </div>
        )
    }
} 
