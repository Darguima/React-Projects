import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'

const AppRoutes:React.FC = () => (
  <BrowserRouter>

    <Route exact path="/" component={LandingPage}/>
    <Route path="/landing" component={LandingPage}/>

  </BrowserRouter>
)

export default AppRoutes
