import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
