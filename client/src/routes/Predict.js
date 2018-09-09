import React, { Component } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

const PredictWrapper = styled.div`
  text-align: left;
`;

class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      reinvestDivident: true,
      initialInvestment: 1000,
      nrOfYears: 50
    };
    this.dividendYield = 0;
  }

  calculateDividentYield(year, dgr) {
    const yieldValue = this.dividendYield;
    if (year === 0) return yieldValue / 100;

    const newDividendYield = yieldValue * (dgr / 100 + 1);
    this.dividendYield = newDividendYield;

    return newDividendYield / 100;
  }

  calculateYearlyDivident(data) {
    const { initialInvestment, nrOfYears, reinvestDivident } = this.state;
    let investment = initialInvestment;
    return Array(nrOfYears)
      .fill()
      .reduce((acc, _, i) => {
        const dividentYield = this.calculateDividentYield(i, data.DGR1yr);

        if (reinvestDivident) {
          investment = investment * (dividentYield + 1);
        }

        const dividend = investment * dividentYield;
        acc.push(Math.round(dividend * 100) / 100);
        return acc;
      }, []);
  }

  componentDidMount() {
    const data = this.props.location.state && this.props.location.state.current;
    this.dividendYield = data[0].Yield;

    const temp2 = this.calculateYearlyDivident(data[0]);
    console.log(temp2);
  }

  render() {
    const data = [
      { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
      { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
    ];
    return (
      <PredictWrapper>
        <h1>Predictions</h1>
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
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </PredictWrapper>
    );
  }
}
export default Predict;
