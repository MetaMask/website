import React from 'react'
import styled from 'styled-components'
import Link from '../../../../Link'
import IconLinkBlack from '../../../../../images/icons/icon-link-black.svg'
import IconLink from '../../../../../images/icons/icon-link.svg'

/**
 * @name AdditionalResources
 * @summary -
 * @description - Portfolio page - Additional Resources
 */

const AdditionalResources = props => {
  const { links } = props

  return (
    <Resources>
      {links?.map(({ displayText, ctaLink, newTab, badge }, i) => {
        return (
          <Resource key={i}>
            <Link to={ctaLink} newTab={newTab}>
              {badge && (
                <Badge $background={badge.background}>{badge.title}</Badge>
              )}
              <ResourceInner>
                {displayText}
                <IconLinkWrapper>
                  <IconLink />
                  <IconLinkBlack />
                </IconLinkWrapper>
              </ResourceInner>
            </Link>
          </Resource>
        )
      })}
    </Resources>
  )
}

export default AdditionalResources

const Resources = styled.ul`
  margin: 12px 0 0;
`
const Resource = styled.li`
  margin: 0;
  border-bottom: 1px solid #ececec;
  list-style: none;

  a {
    display: block;
    width: 100%;
    padding: 12px 0;
    color: inherit;
  }
`
const ResourceInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 14px;
    line-height: 1.575;

    svg {
      min-width: 30px;
      max-width: 30px;
      min-height: 30px;
      max-height: 30px;
      margin-left: 12px;
    }
  }
`
const IconLinkWrapper = styled.div`
  position: relative;
  display: flex;

  svg {
    &:nth-child(2) {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      stroke-dasharray: 110;
      stroke-dashoffset: 110;
      transition: stroke-dashoffset 0.4s ease-out;

      ${Resource}:hover & {
        stroke-dashoffset: 0;
      }
    }
  }
`

const Badge = styled.span`
  display: block;
  width: max-content;
  padding: 6px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #000000;

  ${({ $background }) => ($background ? ` background: ${$background};` : '')}
`
