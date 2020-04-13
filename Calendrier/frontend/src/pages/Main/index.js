import React from "react"

import calendrierApi from "../../services/calendrierApi"

import Header from "./Components/Header"
import Months from "./Components/Months"

import "./styles.css"

export default class Main extends React.Component{
    state = {
        userInfo: {}
    }
    componentDidMount(){
        this.loadUserInfo(this.props.match.params.userId)
    }

    loadUserInfo = async (userId) =>{
        try{
            var userInfo = await calendrierApi.get(`/users/${userId}`)
        }

        catch(err){
            console.error(err)
            alert("Erro - A reiniciar pagina")

            window.location.href = `/`
        }

        this.setState({userInfo: userInfo.data})
    }

    render(){
        return (
            <div id="mainContainer">
                <Header />
                <Months />
            </div>
        )
    }
}
