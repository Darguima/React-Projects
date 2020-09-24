import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'
import ConfigurationsPage from '../pages/ConfigurationsPage'
import CreateEventPage from '../pages/CreateEventPage'
import SeeEventsPage from '../pages/SeeEventsPage'

const AppRoutes:React.FC = () => (
  <BrowserRouter>

    <Route exact path="/" component={LandingPage}/>
    <Route path="/landing" component={LandingPage}/>

    <Route path="/createEvent" component={CreateEventPage}/>

    <Route path="/seeEvents" component={SeeEventsPage}/>

    <Route path="/configuration" component={ConfigurationsPage}/>

  </BrowserRouter>
)

export default AppRoutes
