import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import SunIcon from '../images/icons/icon-sun.svg'
import MoonIcon from '../images/icons/icon-moon.svg'

const ToggleDarkMode = props => {
  const { onChange, checked, name, value } = props
  return (
    <Wrapper>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
      />
      <IconWrapper checked={checked}>
        <Circle checked={checked} />
        <Icon checked={checked}>{checked ? <SunIcon /> : <MoonIcon />}</Icon>
      </IconWrapper>
    </Wrapper>
  )
}
export default withTheme(ToggleDarkMode)

ToggleDarkMode.propTypes = {
  checked: PropTypes.bool,
}

const Wrapper = styled.label`
  display: inline-flex;
  cursor: pointer;

  input {
    display: none;
  }
`
const IconWrapper = styled.span`
  display: inline-flex;
  border-radius: 16px;
  height: 24px;
  width: 56px;
  position: relative;

  ${({ checked }) =>
    checked
      ? `
      background: #F6851B;
      `
      : `
      background: #121212;
      `}
`
const Circle = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
  ${({ checked }) =>
    checked
      ? `
      left: 34px;
      `
      : `
      left: 2px;
      `}
`
const Icon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  svg {
    width: 12px;
    height: 12px;
  }
  ${({ checked }) =>
    checked
      ? `
      left: 6px;
      `
      : `
      right: 6px;
      `}
`;