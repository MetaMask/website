import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { kebabCase } from 'lodash';

import Img from 'gatsby-image';
import Link from './Link';
import AutoscaleText from './AutoscaleText';

/**
 * @name ArticleHero
 * @summary - 
 * @description - 
 */
const ArticleHero = (props) => {
  const {
    title,
    subtitle,
    category,
    image,
    textColor,
    date,
    layout = "overlay",
  } = props;
  const articlePageLink = `/blog/${kebabCase(category)}/${kebabCase(title)}/`;
  const TitleWrapper = layout === "aside" ?
    ({children}) => <TitleLink to={articlePageLink}>{children}</TitleLink> :
    React.Fragment;

  return (
    <ArticleHeroContainer layout={layout}>
      {image && (
        <Link to={articlePageLink}>
          <ArticleHeroImageContainer layout={layout}>
            <ArticleHeroImage fluid={image} />
          </ArticleHeroImageContainer>
        </Link>
      )}
      <ArticleHeroTextContainer
        textColor={textColor}
        layout={layout}
      >
        {layout === "aside" && date &&
          <ArticleHeroDateText>{date}</ArticleHeroDateText>}
        {layout === "overlay" && category &&
          <ArticleHeroCategory>{category}</ArticleHeroCategory>}
        <TitleWrapper>
          <AutoscaleText
            Component={ArticleHeroTitle}
            minFontSize={36}
            lineHeight={11/10}
            maxLineCount={4}
            textColor={textColor}
            layout={layout}
          >
            {title}
          </AutoscaleText>
        </TitleWrapper>
        <ArticleHeroSubtitle>{subtitle}</ArticleHeroSubtitle>
      </ArticleHeroTextContainer>

    </ArticleHeroContainer>

  )
};

export default ArticleHero

ArticleHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  category: PropTypes.string,
  image: PropTypes.object.isRequired,
};

const ArticleHeroContainer = styled.div`  
  position: relative;
  width: auto;
  min-height: 80vh;

  @media (min-width: ${({theme}) => theme.device.desktop}) {
    width: 100vw;
    margin: auto;

    ${({layout}) => layout === "overlay" ?
      `display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 37.5rem;` :
      `display: grid;
      grid-template-columns: repeat(2, 1fr);
      min-height: 28.5rem;`
    }
  }
`;


const ArticleHeroImageContainer= styled.div`
  width: 100%;
  height: 100%;

  ${({layout}) => layout === "overlay" ?
    `position: absolute;
    top: 0;
    left: 0;` :
    ``}
  
`;

const ArticleHeroImage = styled(Img)`
  width: 100%;
  height: 100%;
`;

const ArticleHeroTextContainer = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  padding: 7rem 0 2rem 0;

  ${({layout}) => layout === "overlay" ?
    `justify-content: center;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;` :
    `width: 60%;
    margin: auto;
    text-align: left;`}

    @media (max-width: ${({theme}) => theme.device.mobile}) {
      text-align: left;
    }

    @media (min-width: ${({theme}) => theme.device.desktop}) {
      ${({layout}) => layout === "overlay" ?
    `
    width: 50%;
    ` 
    :
    `
    width: 60%;
    `}
    }
    
  color: ${({textColor}) => textColor || 'white'};
  
`;

const ArticleHeroDateText = styled.p`
  display: block;
  margin: auto ${({theme}) => theme.font.size.sm}rem auto 0;
  padding-bottom: ${({theme}) => theme.font.size.lg}rem;
  color: ${({theme}) => theme.lightBlue};
  font-size: ${({theme}) => theme.font.size.sm}rem;
  font-weight: ${({theme}) => theme.font.weight.semiBold};
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  ${({theme}) => theme.hoverTransition}
`;

const ArticleHeroTitle = styled.h1`
  color: ${({textColor}) => textColor || 'white'};
  font-size: ${({theme}) => theme.font.size.xxxl}rem;
  font-weight: ${({theme}) => theme.font.weight.bold};
  ${({layout}) => layout === 'aside' ? 'text-align: left;' : ''}
  @media(max-width: ${({theme}) => theme.device.mobile}) {
    font-size: 32px;
    margin-bottom: 16px;
  }

`;


const ArticleHeroSubtitle = styled.h3`
  opacity: 0.6;
  font-size: ${({theme}) => theme.font.size.xl}rem;
  font-weight: ${({theme}) => theme.font.weight.light};
  @media(max-width: ${({theme}) => theme.device.mobile}) {
    font-size: ${({theme}) => theme.font.size.md}rem;
    line-height: 1.5rem;
  }
`;

const ArticleHeroCategory = styled.p`

`;
