import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../../Components/Header'

import useAuth from '../../contexts/auth'
import useEvents from '../../contexts/events'

import './styles.css'

const LandingPage:React.FC = () => {
  const history = useHistory()

  const { user, logOut } = useAuth()
  const { selectedMonth, selectedYear } = useEvents()

  const handleLogOutButtonPressed = async () => {
    await logOut()

    history.push('/login')
  }

  return (
    <div id="LandingPageContainer">

      <Header />

      <div>
        {user?.name}<br></br>
        {user?.birthdayMonth}<br></br>
        {user?.birthdayDay}<br></br>
        {user?.birthdayYear}<br></br>
        {user?.email}<br></br>
        {selectedMonth}<br></br>
        {selectedYear}
      </div>

      <button onClick={handleLogOutButtonPressed}>Landing</button>

    </div>
  )
}

export default LandingPage
