import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ScrollToTop from './utils/scroll-to-top';
import './App.scss';

import { Sidebar, Topbar } from './components';
import { Game, Home, StreamPage, User } from './pages';

function App() {
  const screenWidth = window.innerWidth;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(screenWidth > 1000 ? false : true);

  const updateSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <Router className='app'>
      <ScrollToTop />
      <Topbar updateSidebar={updateSidebar} />
      <div className='inner-content'>
        <Sidebar collapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <main>
          <div className='main-container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/game/:id' exact component={Game} />
              <Route path='/user/:username' exact component={User} />
              <Route path='/stream/:id' exact component={StreamPage} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));