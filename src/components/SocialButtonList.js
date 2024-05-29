import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SocialButtonItem from './SocialButtonItem'
import { useLocation } from '@reach/router'
import ContextPage from '../Context/ContextPage'

const SocialButtonList = () => {
  const { sharedCopy } = useContext(ContextPage)

  const list = [
    { name: 'copy', text: sharedCopy.copyLink },
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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHrefState(window.location?.href)
    } else {
      setHrefState(href)
    }
  }, [href])

  return (
    <ListIcon>
      {list.map((item, index) => (
        <SocialButtonItem
          key={index}
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
    border: 1px solid #d6d9dc;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    cursor: pointer;

    &:hover {
      background: #f2f4f6;
      border-color: #bbc0c5;

      span {
        color: #535a61;
      }

      svg > path {
        fill: #535a61;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    padding-top: 20px;
  }
`
