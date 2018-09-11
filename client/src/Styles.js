import styled from 'styled-components';

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

export { FilterContainer, FilterItem, FilterLabel };
