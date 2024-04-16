import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import globalTheme from '../lib/theme'
import './layout.scss'
import './animate.css'
import { mapCodeToHtmlLang } from '../lib/config.mjs'

const Layout = props => {
  const {
    children,
    theme = {},
    h2FontSize,
    themeColor,
    widerContainer,
    locale,
  } = props
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <ThemeProvider theme={{ ...globalTheme, ...theme }}>
      <Wrapper
        h2FontSize={h2FontSize}
        className={classnames({
          [`theme-${themeColor}`]: themeColor,
          'wider-container': widerContainer,
        })}
      >
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            {
              name: 'keywords',
              content: 'blockchain, entrepreneurs, innovation, venture studio',
            },
          ]}
        >
          <html lang={mapCodeToHtmlLang(locale)} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
        </Helmet>
        {children}
      </Wrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Wrapper = styled.div`
  overflow-x: clip;
  ${({ h2FontSize, theme }) =>
    h2FontSize
      ? `
  h2 {
    @media (min-width: ${theme.device.tablet}){
      font-size: ${h2FontSize};
      line-height: 1.2;
    }
  }
  `
      : ''}

  &.theme-dark {
    font-size: 18px;
    line-height: 25px;
    background: #f2f4f6;
    color: #222;

    .dark-mode & {
      background: #121212;
      color: #fff;
    }

    a:not(.button) {
      color: ${({ theme }) => theme.linkColor};
    }
    a:not(.cardLink):hover {
      opacity: 0.9;
    }
  }
`
