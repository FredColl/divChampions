import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './routes/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Dividend Champions Calculator</h1>
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={() => <h1>hej2</h1>} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
