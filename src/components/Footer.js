import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Link from './Link'
import Wrapper from './ContentWrapper'
import ColumnWrapper from './ColumnWrapper'

const StyledFooter = props => {
  const { menus, copyright, logoTitle, logoUrl, logoSvg } = props

  return (
    <FooterContainer>
      <Wrapper
        size={'wide'}
        styleOverride={`margin-top: 0 !important;margin-bottom: 0!important;`}
      >
        <FooterInner>
          <LogoContainer>
            <Link to="/">
              <LogoWrapper>
                {logoSvg?.content ? (
                  <div
                    className="logoMetamaskSvg"
                    dangerouslySetInnerHTML={{
                      __html: logoSvg?.content,
                    }}
                  />
                ) : (
                  <Logo src={logoUrl} alt={logoTitle} />
                )}
              </LogoWrapper>
            </Link>
          </LogoContainer>
          <ColumnWrapper columns={4}>
            {menus.map((menu, index) => {
              const { title, modules } = menu
              return (
                <MenuItem key={index}>
                  <MenuItemHeading>{title}</MenuItemHeading>
                  <MenuItemContent>
                    {modules && modules.length
                      ? modules.map(m =>
                          contentfulModuleToComponent({
                            ...m,
                            hasModuleContainer: true,
                            typeLayout: 'footer',
                          })
                        )
                      : null}
                  </MenuItemContent>
                </MenuItem>
              )
            })}
          </ColumnWrapper>

          <SubFooterContainer>
            <PolicyCopy>
              <PolicyCopyLink className="paragraph" as="span">
                @{new Date().getFullYear()} {copyright}
              </PolicyCopyLink>
            </PolicyCopy>
          </SubFooterContainer>
        </FooterInner>
      </Wrapper>
    </FooterContainer>
  )
}

export default StyledFooter

StyledFooter.propTypes = {
  logo: PropTypes.object,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          to: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  copyright: PropTypes.string,
}

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.footerBg};
`

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 60px 0 60px 0;
`

const SubFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    flex-direction: row;
  }
`

const PolicyCopyLink = styled(Link)`
  font-size: 12px !important;
  line-height: 22px;
`

const PolicyCopy = styled.div`
  margin: 20px 0 0 0;
`
const MenuItemHeading = styled.h5`
  color: ${({ theme }) => theme.orange} !important;
  text-transform: uppercase;
  line-height: 40px;
  margin-bottom: 4px;
`

const MenuItem = styled.div`
  display: block;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    padding: 0 10px 20px 10px !important;
    width: 100% !important;
  }
`

const MenuItemContent = styled.div`
  display: block;
`
const LogoContainer = styled.div`
  display: block;
  margin-bottom: 40px;
`

const LogoWrapper = styled.div`
  display: flex;
  width: 172px;
  height: auto;
`
const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
