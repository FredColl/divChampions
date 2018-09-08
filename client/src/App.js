import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './routes/Home';
import StepGuide from './routes/StepGuide';

const Menu = styled.header`
  background-color: #000;
  position: fixed;
  height: 100%;
  color: white;
  left: 0;
  width: 125px;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  margin-left: 138px;
  width: 100%;
  box-sizing: border-box;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu>
            <h1 className="App-title">Dividend Champions Calculator</h1>
            <Link to="/">List</Link>
            <Link to="/stepguide">Step Guide</Link>
          </Menu>
          <Body>
            <Route exact path="/" component={Home} />
            <Route exact path="/stepguide" component={StepGuide} />
          </Body>
        </div>
      </Router>
    );
  }
}

export default App;
