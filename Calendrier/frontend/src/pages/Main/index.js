import React from "react"

import calendrierApi from "../../services/calendrierApi"

import { connect } from "react-redux"

import Header from "./Components/Header"
import Months from "./Components/Months"

import "./styles.css"

class Main extends React.Component{
    constructor(props){
        super(props)

        this.dispatch = props.dispatch
        this.userInfo = {}

        this.loadUserInfo(this.props.match.params.userId)
    }

    loadUserInfo = async (userId) =>{
        try{
            /*this.userInfo = {
                data:{
                    __v: 0,
                    _id: "5e94882eded90a553b7fe238",
                    events: [],
                    nickname: "Darguima"
                }
            }*/
            this.userInfo = await calendrierApi.get(`/users/${userId}`)
        }

        catch(err){
            console.error(err)
            alert("Erro - A reiniciar pagina")

            window.location.href = `/`
        }

        this.dispatch({
            type: "CHANGE_USER_DATA",
            __v: this.userInfo.data.__v,
            _id: this.userInfo.data._id,
            events: this.userInfo.data.events,
            nickname: this.userInfo.data.nickname
        })
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

export default connect(state => ({userInfo: state}))(Main)
