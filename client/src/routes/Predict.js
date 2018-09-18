import React, { Component } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import CompanyCard from '../components/CompanyCard';
import { FilterContainer, FilterItem, FilterLabel } from '../Styles';

const PredictWrapper = styled.div`
  text-align: left;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
`;

const colors = [
  "#99b433",
  "#990099",
  "#ff0099",
  "#9f00a7",
  "#009900",
  "#00aba9",
  "#00aba9",
  "#99cc33",
  "#00aba9",
  "#da532c",
  "#b91d47"
];

class Predict extends Component {
  state = {
    rawData: [],
    data: [],
    reinvestDividend: false,
    growthRate: false,
    initialInvestment: 1000,
    nrOfYears: 30
  };

  calculateYearlyDividend = data => {
    const {
      initialInvestment,
      nrOfYears,
      reinvestDividend,
      growthRate
    } = this.state;
    let investment = initialInvestment;
    let dividentYield = data.Yield / 100;
    const dgrInProcent = data.DGR10yr / 100 + 1;

    const t = new Array(nrOfYears).fill().reduce((acc, _, i) => {
      const dividend = Math.round(investment * dividentYield);

      if (growthRate) dividentYield = dgrInProcent * dividentYield;

      if (reinvestDividend) {
        investment = Math.round(investment * (dividentYield + 1));
      }

      console.log(data.Name, investment, i, dividend, dividentYield);
      acc.push({ name: i, [data.Name]: dividend });
      return acc;
    }, []);

    return t;
  };

  componentDidMount() {
    const data = this.props.location.state && this.props.location.state.current;

    this.setState({
      rawData: data
    });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  graphData = () => {
    const { rawData } = this.state;
    if (rawData.length === 0) return [];
    const dataForCompanies = rawData.map(this.calculateYearlyDividend);

    const merged = Array(this.state.nrOfYears)
      .fill()
      .map((_, year) => {
        return dataForCompanies.reduce(
          (acc, company) => {
            return { ...acc, ...company[year] };
          },
          { name: year }
        );
      });
    return merged;
  };

  render() {
    const { rawData, InvestmentArray } = this.state;
    const data = this.graphData();

    return (
      <PredictWrapper>
        <h1>Predictions</h1>
        <FilterContainer>
          <FilterItem>
            <FilterLabel>
              Initial investment in $
              <input
                type="number"
                name="initialInvestment"
                value={this.state.initialInvestment}
                onChange={this.handleChange}
              />
            </FilterLabel>
          </FilterItem>
          <FilterItem>
            <FilterLabel>
              Number of years
              <input
                type="number"
                name="nrOfYears"
                value={this.state.nrOfYears}
                onChange={this.handleChange}
              />
            </FilterLabel>
          </FilterItem>
          <FilterItem>
            <FilterLabel>
              Reinvest dividend
              <input
                type="checkbox"
                name="reinvestDividend"
                onChange={this.handleChange}
              />
            </FilterLabel>
          </FilterItem>
          <FilterItem>
            <FilterLabel>
              With dividend growth rate
              <input
                type="checkbox"
                name="growthRate"
                onChange={this.handleChange}
              />
            </FilterLabel>
          </FilterItem>
        </FilterContainer>

        <CardContainer>
          {rawData.map((company, i) => {
            const link = `https://www.dividendchannel.com/symbol/${company.Symbol.toLowerCase()}/chart/`;
            return (
              <a target="_blank" href={link}>
                <CompanyCard
                  {...company}
                  key={company.Name}
                  color={colors[i % colors.length]}
                />
              </a>
            );
          })}
        </CardContainer>
        <h3>Graph</h3>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {rawData.map((company, i) => (
            <Line
              key={company.Name}
              type="monotone"
              dataKey={company && company.Name}
              stroke={colors[i % colors.length]}
            />
          ))}
        </LineChart>
      </PredictWrapper>
    );
  }
}
export default Predict;
// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
// ];
