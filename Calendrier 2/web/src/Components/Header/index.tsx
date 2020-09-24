import React from 'react'
import { Link } from 'react-router-dom'

import { Settings, FilePlus } from 'react-feather'

import useEvents from '../../contexts/events'
import './styles.css'

const Header:React.FC = () => {
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } = useEvents()

  const months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 2 }
  ]

  const years = []
  for (let year = 1900; year < 2100; year++) {
    years.push(year)
  }

  return (
    <header id="HeaderContainer">
      <Link className="Buttons" to="/configuration">
        <Settings size={60}/>
      </Link>

      <select
        className="selectDate"
        value={selectedMonth}
        onChange={e => { setSelectedMonth(Number(e.target.value)) }}
      >
        {months.map((item, key) => (

          <option key={key} value={item.value}>
            {item.name}
          </option>

        ))}
      </select>

      <select
        className="selectDate"
        value={selectedYear}
        onChange={e => { setSelectedYear(Number(e.target.value)) }}
      >
        {years.map((item, key) => (

          <option key={key} value={item}>
            {item}
          </option>

        ))}
      </select>

      <Link id="LandingButton" to="/landing">
        Calendrier
      </Link>

      <Link className="Buttons" to="/createEvent">
        <FilePlus size={60}/>
      </Link>

    </header>
  )
}

export default Header
