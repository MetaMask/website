import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { findFileInListByName } from '../lib/utils/urlParser';

const ResponsiveHeaderLogo = (props) => {
  const {
    theme: {
      white,
      primaryColor
    },
    logoType = "typeface",
    forceColor
  } = props;
  const color = forceColor ? forceColor : (primaryColor === white ? "black" : "white");
  const fileName = `metamask-${logoType}-logo-${color}`;

  return (
    <StaticQuery
      query={graphql`
        query {
          logos: 
            allFile(
              filter: {
                name: {
                  regex: "/^metamask(-.+)?-logo-.+/" 
                }
              }
            ) {
              edges {
                node {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
        }
      `}
      render={(data) => {
        if(!data.logos) return null;
        const logos = data.logos.edges.map(e => e.node.childImageSharp.fluid);
        const logoFile = findFileInListByName(logos)(fileName);
        const Logo = logoType === "icon" ?  IconLogo : TypefaceLogo;
        return (
          <Logo
            fluid={logoFile}
            alt="ConsenSys Labs: Blockchain Venture Studio"
          />
        )
      }}
    />
  );
}

export default withTheme(ResponsiveHeaderLogo);

const TypefaceLogo = styled(Img)`
  width: 112px;
  height: 40px;
  margin: auto;
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    margin: 0;
  }
`;

const IconLogo = styled(Img)`
  width: auto;
  height: auto;
`;
