// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from '../../contexts/auth'

import calendrierLogo from '../../assets/images/logo500.png'
import googleLogo from '../../assets/images/icons/google-logo.svg'
import facebookLogo from '../../assets/images/icons/facebook-logo.svg'
import { User, Lock, Eye, EyeOff, Gift, Mail, Square, CheckSquare, LogIn } from 'react-feather'

import './styles.css'

const SignupPage:React.FC = () => {
  const history = useHistory()
  const { signUp } = useAuth()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')

  const [seePassword, setSeePassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const birthdayArray = birthday.split('-')

    const signupStatus = await signUp(
      name,
      password,
      Number(birthdayArray[1]),
      Number(birthdayArray[2]),
      Number(birthdayArray[0]),
      email
    )

    if (signupStatus.login === 1) {
      history.push('/landing')
    } else if (signupStatus.msg === 'param error') {
      setErrorMessage('Invalid value')
    } else if (signupStatus.msg === 'db error -> response.length < 1') {
      setErrorMessage('Unknown server error while creating the account. Try again later!')
    } else if (signupStatus.msg === 'db error -> response.length > 1') {
      setErrorMessage('Unknown server error. Try again later!')
    } else if (signupStatus.msg === 'email already in use') {
      setErrorMessage('Email already in use. Try another one or login!')
    } else if (signupStatus.msg === 'unknown error') {
      setErrorMessage('Unknown error. Try again later!')
    } else {
      setErrorMessage('Something went wrong. Try again later!')
    }
  }

  return (

    <div id="SignupPageContainer">

      <div id="Left">

        <div id="TitleContainer">
          <p>Signup</p>
        </div>

        <form onSubmit={e => { handleFormSubmit(e) }}>

          <div id="NameInput" className="SignupInput">
            <User className="SignupInputIcon" size={60} />
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="name"
            />
          </div>

          <div id="PasswordInput" className="SignupInput">
            <Lock className="SignupInputIcon" size={60}/>
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
                className="SignupInputIcon"
                id="PasswordViewIcon"
                size={60}
                onClick={() => setSeePassword(!seePassword) }
              />
            }

            {
              seePassword &&
              <EyeOff
                className="SignupInputIcon"
                id="PasswordViewIcon"
                size={60}
                onClick={() => setSeePassword(!seePassword) }
              />
            }
          </div>

          <div id="BirthdayInput" className="SignupInput">
            <Gift className="SignupInputIcon" size={60}/>
            <input
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder="birthday"
            />
          </div>

          <div id="EmailInput" className="SignupInput">
            <Mail className="SignupInputIcon" size={60} />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="e-mail"
            />
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

          <button id="SignUpButton" type="submit">
            <LogIn id="SignUpButtonIcon" size={60} />
            <p>Sign up</p>
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

        <div id="AlreadyHaveAnAccountButtonContainer">
          <Link to="/login">Already have an account</Link>
        </div>
      </div>

      <div id="Right">
        <img id="calendrierLogo" src={calendrierLogo} alt="logo" />
        <div className="ThirdPartyContainer" id="RightThirdPartyContainer">

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

        <p id="SignupInstructions">swipe up to signup</p>

      </div>

      {/* <a href="https://iconscout.com/icons/google" target="_blank">Google Icon</a> by <a href="https://iconscout.com/contributors/icon-mafia">Icon Mafia</a> on <a href="https://iconscout.com">Iconscout</a> */}
      {/* <a href="https://iconscout.com/icons/facebook" target="_blank">Facebook Icon</a> on <a href="https://iconscout.com">Iconscout</a> */}

    </div>
  )
}

export default SignupPage
