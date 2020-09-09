// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from '../../contexts/auth'

import calendrierLogo from '../../assets/images/logo500.png'
import googleLogo from '../../assets/images/icons/google-logo.svg'
import facebookLogo from '../../assets/images/icons/facebook-logo.svg'
import { User, Lock, Eye, EyeOff, Square, CheckSquare, LogIn } from 'react-feather'

import './styles.css'

const LoginPage: React.FC = () => {
  const history = useHistory()
  const { logIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [seePassword, setSeePassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const loginStatus = await logIn(email, password)

    if (loginStatus.login === 1) {
      history.push('/landing')
    } else if (loginStatus.msg === 'param error') {
      setErrorMessage('Invalid value')
    } else if (loginStatus.msg === 'db error -> response.length < 1') {
      setErrorMessage('User not found. Try to create an account!')
    } else if (loginStatus.msg === 'db error -> response.length > 1') {
      setErrorMessage('Unknown server error. Try again later!')
    } else if (loginStatus.msg === 'incorrect password') {
      setErrorMessage('Incorrect password. Try again!')
    } else if (loginStatus.msg === 'unknown error') {
      setErrorMessage('Unknown error. Try again later!')
    } else {
      setErrorMessage('Something went wrong. Try again later!')
    }
  }

  return (
    <div id="LoginPageContainer">

      <div id="Left">
        <img id="calendrierLogo" src={calendrierLogo} alt="logo" />
        <div className="ThirdPartyContainer" id="LeftThirdPartyContainer">

          <button type="button">
            <div className="ThirdPartyLogoContainer">
              <img src={googleLogo} alt="google logo" />
            </div>
            <p>Google</p>
          </button>

          <button type="button">
            <div className="ThirdPartyLogoContainer">
              <img src={facebookLogo} alt="facebook logo" />
            </div>
            <p>Facebook</p>
          </button>

        </div>

        <p id="LoginInstructions">swipe up to login</p>

      </div>
      <div id="Right">

        <div id="TitleContainer">
          <p>Login</p>
        </div>

        <form onSubmit={e => { handleFormSubmit(e) }}>

          <div id="EmailInput" className="LoginInput">
            <User className="LoginInputIcon" size={60} />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="e-mail"
            />
          </div>

          <div id="PasswordInput" className="LoginInput">
            <Lock className="LoginInputIcon" size={60}/>
            <input
              type={ seePassword ? 'text' : 'password'}
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
            />

            {
              !seePassword &&
              <Eye
                className="LoginInputIcon"
                id="PasswordViewIcon"
                size={60}
                onClick={() => setSeePassword(!seePassword) }
              />
            }

            {
              seePassword &&
              <EyeOff
                className="LoginInputIcon"
                id="PasswordViewIcon"
                size={60}
                onClick={() => setSeePassword(!seePassword) }
              />
            }
          </div>

          {
            errorMessage !== '' &&
            <div id="ErrorMessage">
              {errorMessage}
            </div>
          }

          <div id="RememberBox" >
            {
              !rememberPassword &&
              <>
                <Square
                  id="SquareIcon"
                  onClick={() => setRememberPassword(!rememberPassword) }
                />
                <p
                  onClick={() => setRememberPassword(!rememberPassword) }
                >
                  Remember password
                </p>
              </>
            }

            {
              rememberPassword &&
              <>
                <CheckSquare
                  id="SquareIcon"
                  onClick={() => setRememberPassword(!rememberPassword) }
                />
                <p
                  onClick={() => setRememberPassword(!rememberPassword) }
                >
                  Remember password
                </p>
              </>
            }
          </div>

          <button id="LogInButton" type="submit">
            <LogIn id="LogInButtonIcon" size={60} />
            <p>Log In</p>
          </button>

          <button className="ThirdPartyButton" type="button">
            <div className="ThirdPartyLogoContainer">
              <img src={googleLogo} alt="google logo" />
            </div>
            <p>Google</p>
          </button>

          <button className="ThirdPartyButton" type="button">
            <div className="ThirdPartyLogoContainer">
              <img src={facebookLogo} alt="facebook logo" />
            </div>
            <p>Facebook</p>
          </button>

        </form>

        <div id="CreateAnAccountButtonContainer">
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>

      {/* <a href="https://iconscout.com/icons/google" target="_blank">Google Icon</a> by <a href="https://iconscout.com/contributors/icon-mafia">Icon Mafia</a> on <a href="https://iconscout.com">Iconscout</a> */}
      {/* <a href="https://iconscout.com/icons/facebook" target="_blank">Facebook Icon</a> on <a href="https://iconscout.com">Iconscout</a> */}

    </div>
  )
}

export default LoginPage
