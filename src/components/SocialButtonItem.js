import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from './Link'
import SocialIcon from './SocialIcon'
import ContextPage from '../Context/ContextPage'

const SocialButtonItem = props => {
  const { sharedCopy } = useContext(ContextPage)
  const { name, text, url, customColor } = props

  const [tooltip, setTooltip] = React.useState(false)
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setTooltip(true)

    setTimeout(() => {
      setTooltip(false)
    }, 2000)
  }

  return (
    <li>
      {name === 'copy' ? (
        <CopyLink onClick={handleClick}>
          <SocialIcon name={name} text={text} customColor={customColor} />
          <Tooltip tooltip={tooltip}>{sharedCopy.copied}</Tooltip>
        </CopyLink>
      ) : (
        <Link aria-label={name} to={url} newTab>
          <SocialIcon name={name} text={text} customColor={customColor} />
        </Link>
      )}
    </li>
  )
}

SocialButtonItem.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  customColor: PropTypes.string,
}

SocialButtonItem.defaultProps = {
  name: '',
  text: '',
  url: '',
}

export default SocialButtonItem

const CopyLink = styled.div`
  position: relative;
`
const Tooltip = styled.div`
  position: absolute;
  background: #333333b0;
  padding: 2px 20px;
  border-radius: 5px;
  color: #fff;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #333333b0 transparent;
  }
  ${({ tooltip }) =>
    tooltip
      ? `
    opacity: 1;
    visibility: visible;
    `
      : ''}
`
