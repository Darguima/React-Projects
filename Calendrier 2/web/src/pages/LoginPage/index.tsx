// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'

import useAuth from '../../contexts/auth'

import './styles.css'

const LoginPage: React.FC = () => {
  const history = useHistory()
  const { logIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hadleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await logIn(email, password)

    history.push('/')
  }

  return (
    <div id="LoginPageContainer">

      <form onSubmit={e => { hadleFormSubmit(e) }}>
        <label>E-mail</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email"></input>

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>

        <button type="submit">Submit</button>
      </form>

      <Link to="/signup">Sign Up</Link>

    </div>
  )
}

export default LoginPage
