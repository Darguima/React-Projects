import React, { useState, createContext, useContext } from 'react'

interface EventsContextData{
  selectedMonth: number,
  setSelectedMonth(value: number): Promise<void>

  selectedYear: number,
  setSelectedYear(value: number): Promise<void>

}

const EventsContext = createContext<EventsContextData>({} as EventsContextData)

// eslint-disable-next-line react/prop-types
export const EventsProvider:React.FC = ({ children }) => {
  const [selectedMonth, changeSelectedMonth] = useState(1)
  const [selectedYear, changeSelectedYear] = useState(new Date().getFullYear())

  const setSelectedMonth = async (value: number) => { changeSelectedMonth(value) }
  const setSelectedYear = async (value: number) => { changeSelectedYear(value) }

  return (
    <EventsContext.Provider value={{ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }}>
      {children}
    </EventsContext.Provider>
  )
}

export default function useEvents () {
  return useContext(EventsContext)
}
