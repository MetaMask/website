import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const DataTableContainer = (props) => {
  const {
    css = "",
    data,
    headers,
    renderTableHeaders,
    renderTableRows,
  } = props;

  return (
    <DataTable css={css}>
      {renderTableHeaders(headers)}
      {renderTableRows(data)}
    </DataTable>
  );
};

export default DataTableContainer;

DataTableContainer.propTypes = {
  css: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  headers: PropTypes.any.isRequired,
  data:  PropTypes.any.isRequired,
  renderTableHeaders: PropTypes.func.isRequired,
  renderTableRows: PropTypes.func.isRequired,
};


const DataTable = styled.div`
  width: 90%;  
  margin: 0 0 0 20px;
  overflow-x: auto;
  
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    width: 100%;
  }

  @media(min-width: ${({theme}) => theme.device.desktop}) {
    max-width:  ${({theme}) => theme.container.wide};
    margin: 0;
  }
`;