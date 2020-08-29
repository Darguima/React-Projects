// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from '../../contexts/auth'

import calendrierLogo from "../../assets/images/logo500.png"
import googleLogo from "../../assets/images/icons/google-logo.svg"
import facebookLogo from "../../assets/images/icons/facebook-logo.svg"
import { User, Lock, Eye, Square, LogIn, Gift, Mail } from "react-feather"

import './styles.css'

interface SignupPageProps {
}

const SignupPage:React.FC<SignupPageProps> = () => {
  const history = useHistory()

  const { logIn } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // calendrierApi.post("create an account")

    logIn(email, password)

    history.push('/')
  }

  return (

<div id="SignupPageContainer">

<div id="Left">

  <p id="Title">Signup</p>

  <form onSubmit={e => { handleFormSubmit(e) }}>

    <div id="EmailInput" className="SignupInput">
      <User className="SignupInputIcon" strokeWidth="3" />
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="e-mail"></input>
    </div>

    <div id="PasswordInput" className="SignupInput">
      <Lock className="SignupInputIcon"  strokeWidth="3"/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"></input>
      <Eye id="EyeIcon"  strokeWidth="3" />
    </div>

    <div id="BirthdayInput" className="SignupInput">
      <Gift className="SignupInputIcon"  strokeWidth="3"/>
      <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="birthday"></input>
    </div>

    <div id="EmailInput" className="SignupInput">
      <Mail className="SignupInputIcon"  strokeWidth="3"/>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e-mail"></input>
    </div>

    <div id="RememberBox">
      <Square id="SquareIcon" /> Remeber password
    </div>

    <button id="SignUpButton" type="submit">
      <LogIn id="SignUpButtonIcon" />
      <p id="SubmitButtonLabel">Sign up</p>
    </button>
  </form>

  {/*
        <form onSubmit={e => { handleFormSubmit(e) }}>

        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)}></input>

        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password"></input>

        <label>Birthday</label>
        <input value={birthday} onChange={e => setBirthday(e.target.value)} type="date"></input>

        <label>E-mail</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email"></input>

        <button type="submit">Submit</button>

      </form>
      */
    }

  <Link id="CreateAnAccountButton" to="/login">Already have an account</Link>
</div>

<div id="Right">
  <img id="calendrierLogo" src={calendrierLogo} alt="logo" />
  <div id="ThirdPartySignupContainer">

    <button id="GoogleSignupButton" type="button">
      <div id="ThirdPartySignupLogoContainer">
        <img src={googleLogo} alt="google logo" />
      </div>
      <p id="ThirdPartySignupLabel">Google</p>
    </button>

    <button id="FacebookSignupButton" type="button">
      <div id="ThirdPartySignupLogoContainer">
        <img src={facebookLogo} alt="facebook logo" />
      </div>
      <p id="ThirdPartySignupLabel">Facebook</p>
    </button>

  </div>
</div>

{/*Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>*/}

</div>
  )
}

export default SignupPage
