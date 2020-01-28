import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import ScrollToTop from './utils/scroll-to-top';

import './App.scss';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';

function App() {
  return (
    <Router className='app'>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <main>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
          <Route path='/game/:id' exact component={Game} />
        </main>
      </Switch>
    </Router>
  )
}

export default hot(module)(App);