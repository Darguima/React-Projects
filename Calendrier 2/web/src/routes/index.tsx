import React from 'react'

import LoadingPage from '../pages/LoadingPage'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import useAuth from '../contexts/auth'

const Routes:React.FC = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return (
      <LoadingPage />
    )
  }

  if (signed) {
    return (
      <AppRoutes />
    )
  } else {
    return (
      <AuthRoutes />
    )
  }
}

export default Routes
