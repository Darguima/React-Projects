// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from '../../contexts/auth'

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

      <Link to="/login">Log in</Link>

    </div>
  )
}

export default SignupPage
