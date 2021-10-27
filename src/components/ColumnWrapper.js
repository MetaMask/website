import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ColumnWrapper = (props) => {
  const {
    children,
    columns,
    gapColumns = '10px',
    styleOverride,
  } = props;

  return (
    <Container
      styleOverride={styleOverride}
      columns={columns}
      gapColumns={gapColumns}
    >
        {children}
    </Container>
  )
}
export default ColumnWrapper

ColumnWrapper.propTypes = {
  columns: PropTypes.number,
  gapColumns: PropTypes.string,
};

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  margin: ${({gapColumns}) => `-${gapColumns}`};
  > * {
    width: calc(100%/${({columns}) => columns});
    padding: ${({gapColumns}) => gapColumns};
  }

  ${({styleOverride}) => styleOverride}
`;