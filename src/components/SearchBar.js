import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import SearchIcon from './SearchIcon';

/**
 * @name -
 * @summary -
 * @description -
 * @prop -
 */
export default class SearchBar extends PureComponent {
/**
 * @name constructor
 * @summary -
 * @description -
 */
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {
      containerStyleOverride,
      onChange,
      placeholder,
      value,
    } = this.props;

    return (
      <StyledInputContainer styleOverride={containerStyleOverride}>
        <StyledInput
          key={placeholder}
          type="text"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        <SearchIcon height="20px" width="20px" />
      </StyledInputContainer>
    );
  }
}

SearchBar.propTypes = {
  containerStyleOverride: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

const StyledInputContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 1;
  align-items: center;
  justify-content: space-around;  
  height: 50px;
  border: 1px solid ${({theme}) => theme.gray};
  border-radius: 50px;
  ${({styleOverride}) => styleOverride ? styleOverride : ""}
`;


const StyledInput = styled.input`
  width: 60%;
  height: 25px;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({theme}) => theme.theme === 'light' ?
    theme.gray : theme.white};
`;
