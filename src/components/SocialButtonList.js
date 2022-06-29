import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SocialButtonItem from './SocialButtonItem'
import { useLocation } from '@reach/router'

const SocialButtonList = () => {
  const list = [
    { name: 'copy', text: 'Copy link' },
    {
      name: 'twitter',
      url: 'https://twitter.com/intent/tweet?url=',
    },
    {
      name: 'facebook',
      url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
    },
  ]
  const location = useLocation()
  const { href } = location

  const [hrefState, setHrefState] = React.useState('')
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHrefState(window.location?.href)
    } else {
      setHrefState(href)
    }
  }, [href])

  return (
    <ListIcon>
      {list.map(item => (
        <SocialButtonItem
          name={item.name}
          text={item.text}
          url={item.url + hrefState}
          customColor={'#bbc0c5'}
        />
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
