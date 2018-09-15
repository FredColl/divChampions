import React, { Component } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  font-size: 12px;
`;

class Table extends Component {
  state = {
    checked: []
  };

  nextStep = styled.tr`
    font-size: 12px;
  `;

  validYield(column) {
    return column.Yield > this.props.avgYield * this.props.multiplier;
  }

  sum = (x, y) => {
    return parseFloat(x) + parseFloat(y);
  };

  validMarginalRevenuePlusYield = (yieldValue, marginalRevenue) => {
    const { mrFilter } = this.props;
    return mrFilter ? this.sum(yieldValue, marginalRevenue) >= 9 : true;
  };

  handleInputChange = (event, obj) => {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    if (checked) {
      this.setState(
        {
          checked: [...this.state.checked, obj]
        },
        () => this.props.onChange(this.state.checked)
      );
    } else {
      const array = [...this.state.checked];
      const index = array.indexOf(name);
      array.splice(index, 1);
      this.setState({ checked: array }, () =>
        this.props.onChange(this.state.checked)
      );
    }
  };

  render() {
    console.log(this.state.checked);
    const data = this.props.data;
    if (!data) return null;
    let count = 0;
    return (
      <TableContainer>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Select</th>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Symbol</th>
              <th scope="col">Sector</th>
              <th scope="col"># of years</th>
              <th scope="col">Price</th>
              <th scope="col">Dividend Yield %</th>
              <th scope="col">Current Dividend $</th>
              <th scope="col">Payout / Year</th>
              <th scope="col">MR %</th>
              <th scope="col">DGR 1-year</th>
              <th scope="col">DGR 5-year</th>
              <th scope="col">DGR 10-year</th>
              <th scope="col">MR% + Div Yield</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c, i) => {
              if (
                !this.validYield(c) ||
                !this.validMarginalRevenuePlusYield(c.Yield, c.Mr)
              ) {
                return null;
              }
              const link = `https://www.morningstar.com/stocks/xnys/${
                c.Symbol
              }/quote.html`;
              return (
                <tr key={c.Name} className="text-left">
                  <td>
                    <input
                      name={c.Symbol}
                      onChange={e => this.handleInputChange(e, c)}
                      type="checkbox"
                    />
                  </td>
                  <td>{count++}</td>
                  <td>{c.Name}</td>
                  <td>
                    <a target="_blank" href={link}>
                      {c.Symbol}
                    </a>
                  </td>
                  <td>{c.Sector}</td>
                  <td>{c.Yrs}</td>
                  <td>{c.Price}</td>
                  <td>{c.Yield}</td>
                  <td>{c.Dividend}</td>
                  <td>{c.Year}</td>
                  <td>{c.Mr}</td>
                  <td>{c.DGR1yr}</td>
                  <td>{c.DGR5yr}</td>
                  <td>{c.DGR10yr}</td>
                  <td>{this.sum(c.Yield, c.Mr)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
    );
  }
}

export default Table;
