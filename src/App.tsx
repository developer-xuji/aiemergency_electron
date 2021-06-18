/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import InfoPage from './components/InfoPage';
import EmergencyPage from './components/EmergencyPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={InfoPage} />
        <Route path="/emergency" component={EmergencyPage} />
      </Switch>
    </Router>
  );
}
