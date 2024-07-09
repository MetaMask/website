import { graphql, useStaticQuery } from 'gatsby'

import React from 'react'

import styled, { withTheme } from 'styled-components'

const HeaderDisclaimer = () => {
  const data = useStaticQuery(globalConfigurationsQuery)
  const headerDisclaimerTextHTML =
    data.configs.nodes[0]?.headerDisclaimerText?.childMarkdownRemark?.html

  return (
    headerDisclaimerTextHTML && (
      <DisclaimerWrapper>
        <DisclaimerContainer
          dangerouslySetInnerHTML={{
            __html: headerDisclaimerTextHTML,
          }}
        ></DisclaimerContainer>
      </DisclaimerWrapper>
    )
  )
}

export default withTheme(HeaderDisclaimer)

const globalConfigurationsQuery = graphql`
  {
    configs: allContentfulGlobalConfiguration(limit: 1) {
      nodes {
        name
        headerDisclaimerText {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

const DisclaimerContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1163px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: var(--container-width-miniDesktop);
  }

  p {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.white};
  }

  a {
    color: ${({ theme }) => theme.white};
    text-decoration: underline;
  }
`
const DisclaimerWrapper = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.dark};

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 998;
`
