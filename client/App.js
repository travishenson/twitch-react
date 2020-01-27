import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import './App.scss';

import Home from './pages/Home';
import About from './pages/About';

class App extends Component {
  render() {
    return (
      <Router className='app'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About}/>
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(App);