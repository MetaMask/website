import React from 'react';
import styled from 'styled-components';

export default (props) => (
  <DataTableCell>
    {props.children}
  </DataTableCell>
);

const DataTableCell = styled.span`
  align-self: center;
  justify-self: center;
`;