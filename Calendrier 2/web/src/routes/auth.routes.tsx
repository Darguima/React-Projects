import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

const AuthRoutes:React.FC = () => (
  <BrowserRouter>

    <Route exact path="/" component={LoginPage}/>
    <Route path="/login" component={LoginPage}/>

    <Route path="/signup" component={SignupPage}/>

  </BrowserRouter>
)

export default AuthRoutes
