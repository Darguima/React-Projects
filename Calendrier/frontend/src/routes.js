import React from "react"

import { BrowserRouter, Switch, Route } from "react-router-dom"

import Login from "./pages/Login"
import Main from "./pages/Main"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>

            <Route path="/mainPage/:userId" component={Main}/>
        </Switch>
    </BrowserRouter>
)

export default Routes
