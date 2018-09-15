import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: left;
`;

const StepGuide = () => {
  return (
    <Wrapper>
      <h1>How to use the tool</h1>
      <p>
        1. The list helps filtering out the companies with the most{" "}
        <b>Quality</b>
      </p>
      <p>
        2. Verify where the dividend comes from. Focus on the free cash flow and
        not the EPS (divide the companies net income with the diluted numbers of
        shares) to find the <b>Value</b>
      </p>
      <p>
        3. Find the free cash flow on for example morningstar, divide the
        dividends payed with that number. A good procentage is around 75% or
        less, the company should not use all their FCF money to pay dividends or
        even take morgages or savings to pay them (over 100%). Of cource there
        are execeptions, circular market companies might need to, part of their
        operation to do so, but still a warning flag.
      </p>
    </Wrapper>
  );
};

export default StepGuide;
