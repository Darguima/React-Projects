// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from '../../contexts/auth'

import calendrierLogo from '../../assets/images/logo500.png'
import googleLogo from '../../assets/images/icons/google-logo.svg'
import facebookLogo from '../../assets/images/icons/facebook-logo.svg'
import { User, Lock, Eye, Square, LogIn } from 'react-feather'

import './styles.css'

const LoginPage: React.FC = () => {
  const history = useHistory()
  const { logIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const loginStatus = await logIn(email, password)

    console.log(loginStatus)

    if (loginStatus.login === 1) {
      history.push('/landing')
    } else if (loginStatus.msg === 'param error') {
      alert('param invalid')
    } else if (loginStatus.msg === 'db error -> response.length < 1') {
      alert('no user')
    } else if (loginStatus.msg === 'db error -> response.length > 1') {
      alert('more that one user')
    } else if (loginStatus.msg === 'incorrect password') {
      alert('incorrect password')
    } else if (loginStatus.msg === 'unknown error') {
      alert('unknown error')
    } else {
      alert('very unknown error')
    }
  }

  return (
    <div id="LoginPageContainer">

      <div id="Left">
        <img id="calendrierLogo" src={calendrierLogo} alt="logo" />
        <div id="ThirdPartyLoginContainer">

          <button id="GoogleLoginButton" type="button">
            <div id="ThirdPartyLoginLogoContainer">
              <img src={googleLogo} alt="google logo" />
            </div>
            <p id="ThirdPartyLoginLabel">Google</p>
          </button>

          <button id="FacebookLoginButton" type="button">
            <div id="ThirdPartyLoginLogoContainer">
              <img src={facebookLogo} alt="facebook logo" />
            </div>
            <p id="ThirdPartyLoginLabel">Facebook</p>
          </button>

        </div>
      </div>
      <div id="Right">

        <p id="Title">Login</p>

        <form onSubmit={e => { handleFormSubmit(e) }}>

          <div id="EmailInput" className="LoginInput">
            <User className="LoginInputIcon" strokeWidth="3" />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="e-mail"></input>
          </div>

          <div id="PasswordInput" className="LoginInput">
            <Lock className="LoginInputIcon" strokeWidth="3"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"></input>
            <Eye id="EyeIcon" strokeWidth="3" />
          </div>

          <div id="RememberBox">
            <Square id="SquareIcon" /> Remeber password
          </div>

          <button id="LogInButton" type="submit">
            <LogIn id="LogInButtonIcon" />
            <p id="SubmitButtonLabel">Login</p>
          </button>
        </form>

        <Link id="CreateAnAccountButton" to="/signup">Create an Account</Link>
      </div>

      {/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}

    </div>
  )
}

export default LoginPage
