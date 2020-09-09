import React, { useState, useEffect, useContext, createContext } from 'react'

import calendrierApi from '../services/api'

export interface UserSchema {
  name: string,
  password?: string | undefined,
  birthdayMonth: number,
  birthdayDay: number,
  birthdayYear: number,
  email: string,
}

export interface DBUserSchema extends UserSchema {
  userId: number,
}

export interface CalendrierApiResponse {

  msg: string,
  login: number,

  user?: DBUserSchema,
  token?: string,

  error?: [ {
    value?: string,
    msg: string,
    param: string,
    location: string
  }],

  errno?: number,
  code?: string,
}

interface AxiosResponse {
  data: CalendrierApiResponse
}

interface AuthContextData {
  signed: boolean,
  user: DBUserSchema | null,
  loading: boolean,

  logIn(email: string, password: string): Promise<CalendrierApiResponse>,
  signUp(
    name: string,
    password: string,
    birthdayMonth: number,
    birthdayDay: number,
    birthdayYear: number,
    email: string,
  ): Promise<CalendrierApiResponse>,
  logOut(): Promise<void>,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<DBUserSchema | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userStoraged = localStorage.getItem('@CalAuth:user')
    const tokenStoraged = localStorage.getItem('@CalAuth:token')

    if (userStoraged && tokenStoraged) {
      setUser(JSON.parse(userStoraged))

      calendrierApi.defaults.headers.Authorization = `Bearer ${tokenStoraged}`
    }

    setLoading(false)
  }, [])

  async function logIn (email: string, password: string) {
    var response: CalendrierApiResponse

    try {
      response = (await calendrierApi.post('/authentication', { email, password })).data
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          response = err.response.data
        } else {
          return { ...err, msg: 'unknown error', login: 0 }
        }
      } else {
        return { ...err, msg: 'unknown error', login: 0 }
      }
    }

    if (response.user && response.token) {
      setUser(response.user)

      calendrierApi.defaults.headers.Authorization = `Bearer ${response.token}`

      localStorage.setItem('@CalAuth:user', JSON.stringify(response.user))
      localStorage.setItem('@CalAuth:token', response.token)
    }

    return response
  }

  async function signUp (name: string, password: string, birthdayMonth: number, birthdayDay: number, birthdayYear: number, email: string) {
    var response: CalendrierApiResponse

    try {
      response = (await calendrierApi.post('/register', {
        name,
        password,
        birthdayMonth,
        birthdayDay,
        birthdayYear,
        email
      })).data
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          response = err.response.data
        } else {
          return { ...err, msg: 'unknown error', login: 0 }
        }
      } else {
        return { ...err, msg: 'unknown error', login: 0 }
      }
    }

    if (response.user && response.token) {
      setUser(response.user)

      calendrierApi.defaults.headers.Authorization = `Bearer ${response.token}`

      localStorage.setItem('@CalAuth:user', JSON.stringify(response.user))
      localStorage.setItem('@CalAuth:token', response.token)
    }

    return response
  }

  async function logOut () {
    setUser(null)

    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, logIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth () {
  const context = useContext(AuthContext)

  return context
}
