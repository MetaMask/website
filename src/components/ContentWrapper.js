import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentWrapper = (props) => {
  const {
    children,
    size,
    columns,
    styleOverride,
    listingGrid,
    ...rest
  } = props;

  return (
    <Container
      size={size}
      columns={columns}
      styleOverride={styleOverride}
      listingGrid={listingGrid}
      {...rest}
    >
      {children}
    </Container>
  )
}
export default ContentWrapper

ContentWrapper.propTypes = {
  size: PropTypes.oneOf(["narrow", "wide", "full"])
};

const Container = styled.div`
  justify-content: space-around;
  width: 100%;
  margin: 3rem auto;
  
  ${({htmlEmbed}) => htmlEmbed ? `
    display: flex;
    flex-direction: column;
    iframe {
      margin: 0 auto;
    }
  ` : ""}

  ${({columns}) => columns ? (columns < 4 ? `
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  ` :`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
  ` ): ""}

  @media (min-width: ${({theme}) => theme.device.tablet}) {
    margin: 5rem auto;
    ${({columns}) => (`
      grid-template-columns: repeat(${columns || 1}, 1fr);
    `)}
  }

  @media (min-width: ${({theme}) => theme.device.desktop}) {
    ${({columns, theme, size}) => {
      const maxWidth = theme.container[size] || theme.container.wide;
      const cols = columns || 1;
      return `
        grid-template-columns: repeat(${cols}, 1fr);
        max-width: ${maxWidth};
      `;
    }}
  }
  @media (max-width: ${({theme}) => theme.device.desktopMediaMax}) {
    width: 100vw;
    max-width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (max-width: ${({theme}) => theme.device.mobileMediaMax}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (max-width: ${({theme}) => theme.device.tabletMediaMax}) {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  ${({size}) => size === 'full' ? `
    padding: 0 !important;
  ` : ""}
  ${({listingGrid}) => listingGrid ? `
    padding: 0 !important;
  ` : ""}
  ${({styleOverride}) => styleOverride}
`;
