import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Table from '../components/Table';
import { FilterContainer, FilterItem, FilterLabel } from '../Styles';

const HomeWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

class Home extends Component {
  state = {
    checked: [],
    response: {},
    avgYield: 0,
    multiplier: 1,
    mrFilter: false
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
    const value = target.type === "checkbox" ? target.checked : target.value;
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
        <h1>US Dividend Champions list</h1>
        <FilterContainer>
          <FilterItem>
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
            <FilterLabel>
              MR% + Div filter
              <input
                type="checkbox"
                name="mrFilter"
                value={this.state.mrFilter}
                onChange={this.handleChange}
              />
            </FilterLabel>
          </FilterItem>
          <FilterItem>
            <Link
              to={{
                pathname: "/predict",
                state: { current: this.state.checked }
              }}
            >
              <button
                className="btn btn-primary btn-lg"
                disabled={this.state.checked.length === 0}
              >
                Predict
              </button>
            </Link>
          </FilterItem>
        </FilterContainer>
        <Table
          data={array}
          avgYield={this.state.avgYield}
          multiplier={this.state.multiplier}
          mrFilter={this.state.mrFilter}
          onChange={this.onSelectedCompany}
        />
      </HomeWrapper>
    );
  }
}

export default Home;
