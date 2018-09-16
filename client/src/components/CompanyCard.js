import React, { Component } from 'react';
import styled from 'styled-components';

const CompanyCard = props => {
  const Card = styled.div`
    display: flex;
    width: 250px;
    flex-direction: column;
    padding: 15px;
    text-align: left;
    margin: 8px;
    background-color: ${props.color};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  `;

  const { Name, Yield, DGR10yr, Symbol } = props;
  return (
    <Card>
      <div>
        <b>{Name}</b>
      </div>
      <div>{Symbol}</div>
      <div>Yield: {Yield} % </div>
      <div>CAGR (10): {DGR10yr} %</div>
    </Card>
  );
};

export default CompanyCard;
