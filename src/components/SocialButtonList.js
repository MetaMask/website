import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SocialButtonItem from './SocialButtonItem'

const SocialButtonList = () => {
  const list = [
    {'name': 'coppy', 'text': 'Coppy link', 'url': '/'}, 
    {'name': 'twitter', 'url': '/'}, 
    {'name':'facebook', 'url': '/'}, 
    {'name': 'linkedin', 'url': '/'}
  ];

  return (
    <ListIcon>
      {list.map(item => (
        <SocialButtonItem name={item.name} text={item.text} url={item.url}/>
      ))}
    </ListIcon>
  );
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
    border: 1px solid #BBC0C5;
    border-radius: 8px;
    cursor: pointer;
  }
`
