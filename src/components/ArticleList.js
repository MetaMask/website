import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { kebabCase } from 'lodash'
import { getArticleCategory } from '../lib/utils/blog';

import Wrapper from './ContentWrapper';
import ArticleListItem from './ArticleListItem';

/**
 * @name - 
 * @summary - 
 * @description - 
 * @prop - 
 */
const ArticleList = (props) => {
  const {
    title,
    columns,
    articles,
    containerWidth,
    children
  } = props;

  return (
    <Wrapper size={containerWidth || "wide"}>
      {title && <ArticleListTitle>{title}</ArticleListTitle> }
      <Wrapper
        size={containerWidth || "wide"}
        columns={columns || 3}
        listingGrid
        styleOverride={`margin-top: 0 !important;margin-bottom: 0!important;`}
      >
        {articles.map((article) => {
          const {
            title,
            subtitle,
            image,
            articleCategories,
            primaryCategory,
          } = article;
          const category = getArticleCategory(primaryCategory, articleCategories);
          return (
            <ArticleListItem
              key={title}
              title={title}
              subtitle={subtitle}
              image={image}
              category={category}
              link={`/blog/${kebabCase(category)}/${kebabCase(title)}/`}
              listColumns={columns || 3}
            />
          )
        })}
      </Wrapper>
      {children}
    </Wrapper>
  );
}

ArticleList.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default ArticleList;

const ArticleListTitle = styled.h2`
  font-size: ${({theme}) => theme.font.size.x4}rem;
  font-weight: ${({theme}) => theme.font.weight.semiBold};
  margin-bottom: 2rem;
`;
