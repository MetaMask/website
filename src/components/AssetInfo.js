import React from 'react'
import ContentWrapper from './ContentWrapper'
import { Section } from './StyledGeneral'
import styled, { withTheme } from 'styled-components'
import PDFIcon from '../images/icons/pdf.svg'

const AssetInfo = ({ assetData }) => {
  if (!assetData) return null

  return (
    <Section>
      <ContentWrapper>
        <h1 className="mb-6 mt-3">List of assets</h1>
        <CardContainer>
          {assetData.map(asset => {
            const isDocument = asset.filename.includes('.pdf')
            return (
              <CardWrapper href={asset.url} target="_blank">
                <CardPreview background={!isDocument && asset.url}>
                  {isDocument && <PDFIcon />}
                </CardPreview>
                <CardDescription>
                  <span>{asset.filename}</span>
                </CardDescription>
              </CardWrapper>
            )
          })}
        </CardContainer>
      </ContentWrapper>
    </Section>
  )
}

export default withTheme(AssetInfo)

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 88px;
`

const CardWrapper = styled.a`
  width: calc(25% - 24px);
  background-color: #f2f6fc;
  border-radius: 8px;
  padding: 8px 8px 0 8px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
  }
  body.dark-mode & {
    background-color: #3d444b;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    width: calc(33.33% - 21.33px);
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: calc(50% - 16px);
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    width: 100%;
  }
`

const CardPreview = styled.div`
  height: 200px;
  background-color: white;
  border-radius: 3px;

  svg {
    width: 50px;
    margin-top: 24px;
    margin-left: 24px;
  }

  body.dark-mode & {
    background-color: #f7f9fb;
  }

  ${({ background }) =>
    background
      ? `
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
  `
      : ``}
`

const CardDescription = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
`
