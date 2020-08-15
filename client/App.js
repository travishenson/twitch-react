import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import ScrollToTop from './utils/scroll-to-top';

import './App.scss';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Game from './pages/Game';
import User from './pages/User';
import StreamPage from './pages/Stream';

function App() {
  return (
    <Router className='app'>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <main>
          <Route path='/' exact component={Home} />
          <Route path='/game/:id' exact component={Game} />
          <Route path='/user/:username' exact component={User} />
          <Route path='/stream/:id' exact component={StreamPage} />
          <Route path='/*' render={() => <Redirect to='/' />} />
        </main>
      </Switch>
    </Router>
  )
}

export default hot(module)(App);