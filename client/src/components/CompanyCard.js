import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  background: #efefef;
  padding: 15px;
  text-align: center;
  margin: 8px;
`;
const CompanyCard = props => {
  const { Name, Yield, DGR10yr } = props;
  return (
    <Card>
      <div>Name: {Name}</div>
      <div>Yield: {Yield} % </div>
      <div>CAGR (10): {DGR10yr} %</div>
    </Card>
  );
};

export default CompanyCard;
