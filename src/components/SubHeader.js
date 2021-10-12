
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './Link';

const SubHeader = (props) => {
  const {
    links,
    backgroundColor,
  } = props;

  return (
    <SubHeaderContainer bgColor={backgroundColor}>
      {links && links.length ? links.map(l => (
        <SubHeaderLink
          to={l.to + l.text}
          key={l.to}
          newTab={l.newTab}
          bgColor={backgroundColor}
        >
          {l.text}
        </SubHeaderLink>
      )) : null}
    </SubHeaderContainer>
  )
}

SubHeader.propTypes = {
  links: PropTypes.array.isRequired,
  backgroundColor: PropTypes.string,
};

export default SubHeader;


const SubHeaderContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: ${({bgColor, theme}) =>
    bgColor === "white" ? theme.white : theme.black};

  box-shadow: ${({theme}) => theme.shadow.light};
  
`;

const SubHeaderLink = styled(Link)`
  padding: ${({theme}) => theme.font.size.xl}rem;
  transition: all 0.2s ease-in-out;
  color: ${({bgColor, theme}) =>
    bgColor === "white" ? theme.black : theme.white};
  text-decoration: none;
  :hover {
    background-color: #497BF8;
    color: white;
  }
`;
