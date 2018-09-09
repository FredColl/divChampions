import React, { Component } from 'react';
import styled from 'styled-components';

import Table from '../components/Table';

const HomeWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;
  margin: 16px 0;
  border: 1px solid black;
`;

const FilterItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 33%;
  margin: auto;
`;

const FilterLabel = styled.label`
  display: flex;
  padding: 8px;
  flex-direction: column;
`;

class Home extends Component {
  state = {
    checked: [],
    response: {},
    avgYield: 0,
    multiplier: 1
  };

  componentDidMount() {
    this.callApi()
      .then(data => this.setState({ response: data }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/table");
    const body = await response.json();

    if (response.status !== 200) throw Error(body);

    return body;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  onSelectedCompany = array => {
    this.setState({
      checked: array
    });
  };

  render() {
    console.log(this.state.checked);
    if (!this.state.response.data) return null;
    const array = this.state.response.data;
    return (
      <HomeWrapper>
        <h1>Dividend Champions list</h1>
        <FilterContainer>
          <FilterItem>
            <form onSubmit={this.handleSubmit}>
              <FilterLabel>
                <a
                  target="_blank"
                  href="http://www.multpl.com/s-p-500-dividend-yield/"
                >
                  Market average yield:
                </a>
                <input
                  type="number"
                  name="avgYield"
                  onChange={this.handleChange}
                />
              </FilterLabel>
            </form>
          </FilterItem>
          <FilterItem>
            <FilterLabel>
              <a
                target="_blank"
                href="http://www.multpl.com/s-p-500-dividend-yield/"
              >
                Multiplier:
              </a>
              <input
                type="number"
                name="multiplier"
                onChange={this.handleChange}
              />
            </FilterLabel>
          </FilterItem>
          <FilterItem>
            <button
              className="btn btn-primary btn-lg"
              disabled={this.state.checked.length === 0}
            >
              Predict
            </button>
          </FilterItem>
        </FilterContainer>
        <Table
          data={array}
          avgYield={this.state.avgYield}
          multiplier={this.state.multiplier}
          onChange={this.onSelectedCompany}
        />
      </HomeWrapper>
    );
  }
}

export default Home;
