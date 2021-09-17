import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Link from './Link';

/**
 * @name -
 * @summary -
 * @description -
 * @prop -
 */
const ArticleListItem = (props) => {
  const {
    title,
    link,
    subtitle,
    image,
    listColumns,
  } = props;

  return (
    <ArticleContainer>
      <Link to={link}>
        <ArticleImageContainer columns={listColumns}>
          <StaticQuery
            query={graphql`{
              contentfulAsset(
                contentful_id: { eq: "1LiFWtDFlQu3CxtlgbAife" }
              ) {
                fluid(maxWidth: 600, quality: 100, toFormat: WEBP) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }`}
            render={(data) => (
              <ArticleImage fluid={(image || data.contentfulAsset).fluid} />
            )}
          />
        </ArticleImageContainer>
      </Link>
      <ArticleTitle to={link}>{title}</ArticleTitle>
      <ArticleSubtitle>
        {subtitle}
      </ArticleSubtitle>
    </ArticleContainer>
  );
}

ArticleListItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
};

const ArticleContainer = styled.div``;

const ArticleImageContainer = styled.div`
  ${({columns}) => {
    let height;
    // change image height based on container width
    // to maintain proportions (not aspect ratio)
    switch(columns) {
      case 2: height = 21.4; break;
      case 3: height = 14.25; break;
      case 4: height = 10.7; break;
      default: height = 14.25; break;
    }
    return `height: ${height}rem;`;
  }}
  border: 1px solid rgba(89, 89, 89, 0.2);
  margin-bottom: ${({theme}) => theme.font.size.lg}rem;
`;

const ArticleImage = styled(Img)`
  width: 100%;
  height: 100%;
`;

const ArticleTitle = styled(Link)`
  color: ${(({theme}) => theme.black)};
  font-size: 20px;
  line-height: 1.4;
  font-weight: ${(({theme}) => theme.font.weight.semiBold)};
  text-decoration: none;
  cursor: pointer;
  ${({theme}) => theme.hoverTransition}
`;

const ArticleSubtitle = styled.p`
  margin-top: 16px;
  font-weight: normal;
  font-size: 13px;
  line-height: 150%;
  color: #595959;
`;


export default ArticleListItem;
