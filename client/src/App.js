import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './routes/Home';
import StepGuide from './routes/StepGuide';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Dividend Champions Calculator</h1>
            <Link to="/">List</Link>
            <Link to="/stepguide">Step Guide</Link>
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/stepguide" component={StepGuide} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
