
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ArrowIcon from './ArrowIcon';
import Link from './Link';
import Img from 'gatsby-image';
import RichText from './RichText';

const Spotlight = (props) => {
  const {
    header,
    text,
    link,
    image,
    newTab,
    textBackgroundColor,
    imageBackgroundColor,
    linkText,
    richText,
    isBanner,
  } = props;

  const WrapperEl = link ? 
   ({children}) => <Link to={link} newTab={newTab}>{children}</Link> :
   React.Fragment;
  let bodyConfig;
  if(richText && richText.content)
   bodyConfig = richText.content;

  if(richText && richText.internal)
   bodyConfig = JSON.parse(richText.internal.content).content;

  return (
    <SpotlightContainer isBanner={isBanner}>
      <SpotlightTextContainer isBanner={isBanner} backgroundColor={textBackgroundColor}>
        {header && <SpotlightHeader> {header} </SpotlightHeader>}
        <WrapperEl>
          <SpotlightText>
            {text}
            {richText ? (
              <RcItem>
                <RichText content={bodyConfig} />
              </RcItem>
            ) : null}
            {link && <CTAContainer> <CTAText>{linkText}</CTAText><ArrowIcon fill="black"/> </CTAContainer>}
          </SpotlightText>
        </WrapperEl>
      </SpotlightTextContainer>

      {image &&
        <WrapperEl>
          <SpotlightImageContainer backgroundColor={imageBackgroundColor}>
            <SpotlightImage fluid={image} />
          </SpotlightImageContainer>
        </WrapperEl>}

    </SpotlightContainer>
  );
}

export default Spotlight;

Spotlight.propTypes = {
  header: PropTypes.string,
  image: PropTypes.object,
  imageBackgroundColor: PropTypes.string,
  link:  PropTypes.string,
  text: PropTypes.string,
  richText: PropTypes.object,
  textBackgroundColor: PropTypes.string,
  title: PropTypes.string,
};

const SpotlightContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 3em 1.25em;
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: ${({theme}) => theme.container.narrow};
    min-height: 500px;
  }
  ${({isBanner}) => isBanner ? `
    width: 100% !important;
    padding: 100px 0 !important;
    min-height: 420px !important;
  ` : ``}
`;

const SpotlightTextContainer = styled.div`
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    flex: 1;
    margin-bottom: 5%;
    padding-right: 2%;
    background-color: ${({backgroundColor}) =>
      backgroundColor ? backgroundColor : ""};
      ${({isBanner}) => isBanner ? `
    margin-bottom: 0 !important;
    padding-right: 0 !important;
  ` : ``}
  }
`;

const SpotlightHeader  = styled.h3`
  color: #202328;
  font-size: ${({theme}) => theme.font.size.md}rem;
  font-weight: ${({theme}) => theme.font.weight.semiBold};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const SpotlightText = styled.p`
  color: #202328;
  font-size: 2.625rem;
  font-weight: ${({theme}) => theme.font.weight.semiBold};
  letter-spacing: -0.2px;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    align-self: center;
    margin-bottom: 0;
  }
`;

const SpotlightImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
  background-color: ${({backgroundColor}) =>
    backgroundColor ? 
    `background-color: ${backgroundColor}; padding: 2rem;` :
    ""};
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    flex: 1;
    width: 23.875em;
  }
`;

const SpotlightImage = styled(Img)`
  align-self: center;
  width: 100%;
  height: auto;
  max-height: 200px;
  margin-bottom: 0;
`;

const CTAText = styled.span`
  display: inline-flex;
  margin-right: 8px;
`;
const CTAContainer = styled.span`
  display: flex;
  align-items: center;
  margin-top: 72px;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5625rem;
  line-height: 1;
  color: ${({theme}) => theme.lightBlue};
  @media (max-width: ${({theme}) => theme.device.mobile}) {
      font-size: 1.25rem;
    }
`;

const RcItem = styled.div`
  font-size: ${({theme}) => theme.font.size.x5}rem;
  font-weight: bold;
  p {
    font-size: ${({theme}) => theme.font.size.x5}rem;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 8px;
    @media (max-width: ${({theme}) => theme.device.mobile}) {
      font-size: 2.5rem;
    }
  }
`;