import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './routes/Home';
import Predict from './routes/Predict';
import StepGuide from './routes/StepGuide';

const AppContainer = styled.div`
  text-align: center;
  box-sizing: border-box;
`;

const Menu = styled.header`
  background-color: #000;
  position: fixed;
  height: 100%;
  color: white;
  width: 9%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  width: 91%;
  margin-left: 9%;
  padding: 16px;
  box-sizing: border-box;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <AppContainer>
          <Menu>
            <h1 className="App-title">Dividend Champions Calculator</h1>
            <Link to="/">List</Link>
            <Link to="/stepguide">Step Guide</Link>
          </Menu>
          <Body>
            <Route exact path="/" component={Home} />
            <Route exact path="/predict" component={Predict} />
            <Route exact path="/stepguide" component={StepGuide} />
          </Body>
        </AppContainer>
      </Router>
    );
  }
}

export default App;
