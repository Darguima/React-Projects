import React, { useState, useEffect, useContext, createContext } from 'react'
import { useHistory } from 'react-router-dom'

import calendrierApi, { calendrierApiFake } from '../services/api'

interface User {
  userId: number,
  name: string,
  birthdayMonth: number,
  birthdayDay: number,
  birthdayYear: number
  email: string,
}

interface AuthContextData {
  signed: boolean,
  user: User | null,
  loading: boolean,

  logIn(email: string, password: string): Promise<void>,
  logOut(): Promise<void>,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userStoraged = localStorage.getItem('@CalAuth:user')
    const tokenStoraged = localStorage.getItem('@CalAuth:token')

    calendrierApi.defaults.headers.Authorization = `Bearer ${tokenStoraged}`

    if (userStoraged && tokenStoraged) {
      setUser(JSON.parse(userStoraged))
    }

    setLoading(false)
  }, [])

  async function logIn (email: string, password: string) {
    const response = await calendrierApiFake(email, password)

    setUser(response.user)

    calendrierApi.defaults.headers.Authorization = `Bearer ${response.token}`

    localStorage.setItem('@CalAuth:user', JSON.stringify(response.user))
    localStorage.setItem('@CalAuth:token', response.token)
  }

  async function logOut () {
    setUser(null)

    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth () {
  const context = useContext(AuthContext)

  return context
}
