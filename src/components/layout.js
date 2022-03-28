import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import globalTheme from '../lib/theme'
import './layout.scss'
import './animate.css'

const Layout = props => {
  const { children, theme = {}, h2FontSize } = props
  return (
    <ThemeProvider theme={{ ...globalTheme, ...theme }}>
      <Wrapper h2FontSize={h2FontSize}>
        <StaticQuery
          query={graphql`
            {
              site {
                siteMetadata {
                  title
                  description
                }
              }
            }
          `}
          render={data => (
            <>
              <Helmet
                title={data.site.siteMetadata.title}
                meta={[
                  {
                    name: 'description',
                    content: data.site.siteMetadata.description,
                  },
                  {
                    name: 'keywords',
                    content:
                      'blockchain, entrepreneurs, innovation, venture studio',
                  },
                ]}
              >
                <html lang="en" />
              </Helmet>
              {children}
            </>
          )}
        />
      </Wrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Wrapper = styled.div`
  ${({ h2FontSize }) =>
  h2FontSize
      ? `
  h2 {
    font-size: ${h2FontSize};
    line-height: 1.2;
  }
  `
      : ''}
`