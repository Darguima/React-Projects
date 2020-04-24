import React from "react"

import { BrowserRouter, Switch, Route } from "react-router-dom"

import Login from "./pages/Login"
import Main from "./pages/Main"

import MonthCalendar from "./pages/MonthCalendar"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>

            <Route path="/mainPage/:userId" component={Main}/>

            <Route path="/month/:monthName/:userId" component={MonthCalendar}/>
        </Switch>
    </BrowserRouter>
)

export default Routes
