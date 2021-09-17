import React from 'react';
import styled from 'styled-components';

export default (props) => (
  <DataTableHeader>
    {props.children}
  </DataTableHeader>
);


const DataTableHeader = styled.span`
  width: 100%;
  font-size: ${({theme}) => theme.font.size.med};
  font-weight: ${({theme}) => theme.font.weight.semiBold};
  text-transform: uppercase;
`;