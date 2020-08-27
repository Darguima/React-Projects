import React from 'react'
import Routes from './routes'

import { AuthProvider } from './contexts/auth'

import './assets/styles/global.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>

        <Routes />

      </AuthProvider>
    </div>

  )
}

export default App
