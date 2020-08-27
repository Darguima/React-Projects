import React from 'react'
import { useHistory } from 'react-router-dom'

import useAuth from '../../contexts/auth'

import './styles.css'

interface LandingPageProps {
}

const LandingPage:React.FC<LandingPageProps> = () => {
  const history = useHistory()

  const { user, logOut } = useAuth()

  const handleLogOutButtonPressed = async () => {
    await logOut()

    history.push('/')
  }

  return (
    <div id="LandingPageContainer">

      <div>
        {user?.name}<br></br>
        {user?.birthdayMonth}<br></br>
        {user?.birthdayDay}<br></br>
        {user?.birthdayYear}<br></br>
        {user?.email}
      </div>

      <button onClick={handleLogOutButtonPressed}>Landing</button>

    </div>
  )
}

export default LandingPage
