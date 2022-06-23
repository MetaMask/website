import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SocialButtonItem from './SocialButtonItem'

const SocialButtonList = () => {
  const list = [
    { name: 'coppy', text: 'Coppy link' },
    {
      name: 'twitter',
      url: 'https://twitter.com/intent/tweet?' + window.location.href,
    },
    {
      name: 'facebook',
      url:
        'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
    },
    {
      name: 'linkedin',
      url:
        'https://www.linkedin.com/sharing/share-offsite/?url=' +
        window.location.href,
    },
  ]

  return (
    <ListIcon>
      {list.map(item => (
        <SocialButtonItem name={item.name} text={item.text} url={item.url} />
      ))}
    </ListIcon>
  )
}

SocialButtonList.propTypes = {
  name: PropTypes.string,
}

export default SocialButtonList

const ListIcon = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  align-items: center;
  li {
    margin: 0 6px;
    border: 1px solid #bbc0c5;
    border-radius: 8px;
    cursor: pointer;
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    padding-top: 20px;
  }
`
