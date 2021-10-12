import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './Link';

/**
 * @name Breadcrumbs
 * @summary - 
 * @description - 
 */
const Breadcrumbs = (props) => {
  const {
    crumbs
  } = props;

  const renderCrumbs = () => crumbs && crumbs.length ? 
    crumbs.map((c, i) => (
      <div key={c.link}>
        <CrumbPadding>
          <Breadcrumb
            to={c.link}
            activeStyle={{color: "black", fontWeight: "500"}}
          >
            {c.name}
          </Breadcrumb>
        </CrumbPadding>
        {crumbs[i + 1] ? <CrumbPadding> / </CrumbPadding> : null}
      </div>
    )) :
    null;

  return (
    <BreadcrumbsContainer>
      {renderCrumbs()}
    </BreadcrumbsContainer>

  )
};

export default Breadcrumbs

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }))
};

const BreadcrumbsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: auto;
  height: 25px;
`;

const Breadcrumb = styled(Link)`
  transition: all 0.15s ease;
  color: ${({theme}) => theme.gray};
  font-size: ${({theme}) => theme.font.size.sm}rem;
  text-decoration: none;
  &:hover {
    color: ${({theme}) => theme.black};
  }
`;

const CrumbPadding = styled.span`
  padding-right: 5px; 
`;
