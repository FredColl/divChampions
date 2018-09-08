import React, { Component } from 'react';

class Table extends Component {
  validYield(column) {
    return column.Yield > this.props.avgYield * 1.5;
  }

  sum = (x, y) => {
    return parseFloat(x) + parseFloat(y);
  };

  validMarginalRevenuePlusYield = (yieldValue, marginalRevenue) => {
    const sum = this.sum(yieldValue, marginalRevenue);
    return sum > 9;
  };

  render() {
    const data = this.props.data;
    let count = 0;
    if (!data) return null;
    return (
      <table className="table">
        <thead>
          <tr>
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
    );
  }
}

export default Table;
