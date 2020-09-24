import React from 'react'

import LoadingPage from '../pages/LoadingPage'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import { EventsProvider } from '../contexts/events'

import useAuth from '../contexts/auth'

const Routes:React.FC = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return (
      <LoadingPage />
    )
  }

  if (!signed) {
    return (
      <AuthRoutes />
    )
  } else {
    return (
      <EventsProvider>
        <AppRoutes />
      </EventsProvider>
    )
  }
}

export default Routes
