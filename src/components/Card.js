import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import Arrow from './ArrowIcon';
import Link from './Link';
import Img from 'gatsby-image';

/**
 * @name Card
 * @summary -
 * @description - Module for blog content
 */
const StyledCard = (props) => {
  const {
    description,
    image,
    link,
    title,
    newTab,
  } = props;

  const WrapperEl = link ?
    (props) => (
      <LinkedCardContainer
        to={link}
        newTab={newTab}
      >
        {props.children}
      </LinkedCardContainer>) :
    CardContainer;

  return (
    <WrapperEl>
      {image && <CardImageContainer fluid={image} />}
      <CardTextContainer>
        <CardTitle> {title} </CardTitle>
        <CardBody>
          {description}
        </CardBody>
        {link && <Arrow fill="black" width="65px" />}
      </CardTextContainer>
    </WrapperEl>
  )
};


export default StyledCard;

StyledCard.propTypes = {
  body: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

const cardContainerStyles = css`
  display: flex;
  flex-direction: column;
  max-width: 35.6rem;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    box-shadow: ${({theme}) => theme.shadow.medium};
    &:last-child {
      margin: 0;
    }
  }
`;

const LinkedCardContainer = styled(Link)`
  ${cardContainerStyles}
  color: ${({theme}) => theme.black};
  text-decoration: none;
`;

const CardContainer = styled.div`
  ${cardContainerStyles}
`;

const CardImageContainer  = styled(Img)`
  width: 100%;
  height: 12rem;
  margin-bottom: 1.25rem;
  background-image: url(${({src}) => src});
  background-repeat: no-repeat;
  background-position: 50% 30%;
  background-size: cover;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    height: 21.25rem;
    background-position: 50% 50%;
  }
`;


const CardTextContainer = styled.div`
  min-height: 6rem;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    padding: 3.375rem;
  }
`;

const CardTitle = styled.h3`
  color: ${({theme}) => theme.black};
  font-weight: ${({theme}) => theme.font.weight.semiBold};

  @media(min-width: ${({theme}) => theme.device.tablet}) {
    font-size: ${({theme}) => theme.font.size.xxl}rem;
  }
  
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    margin-bottom: 0.9375rem;
    line-height: 2.4375rem;
  }
`;

const CardBody = styled.p`
  line-height: 1.375rem;
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    width: 100%;
    color: #595959;
    font-size: ${({theme}) => theme.font.size.sm}rem;
    font-weight: ${({theme}) => theme.font.weight.regular};
  }
`;
