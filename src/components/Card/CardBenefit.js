import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Image from '../Image'

const CardBenefit = props => {
  const { title, description, image, darkImage, previewMode } = props

  return (
    <Card>
      <ImageWrapper>
        <Image image={image} darkImage={darkImage} previewMode={previewMode} />
      </ImageWrapper>
      <ContentWrapper>
        {title && <Title>{title}</Title>}
        {description && (
          <Description>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Description>
        )}
      </ContentWrapper>
    </Card>
  )
}

CardBenefit.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  darkImage: PropTypes.object,
  previewMode: PropTypes.bool,
}

export default CardBenefit

const Card = styled.div`
  display: flex;
  gap: 40px;

  ${({ theme }) => `
  @media (max-width: ${theme.device.mobileMediaMax}){
    flex-direction: column;
    gap: 16px;
  }`}
`

const ImageWrapper = styled.div`
  width: 363px;

  img {
    object-fit: contain;
  }

  ${({ theme }) =>
    `@media (max-width: ${theme.device.mobileMediaMax}){
      width: 100%;
      img {
        width: 100%;
      }
  }
  `}
`

const ContentWrapper = styled.div`
  max-width: 100%;
  width: 453px;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 24px;

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: 20px;
    margin-bottom: 16px;
    text-align: left;
  }
  `}
`

const Description = styled.div`
  display: block;

  p:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    text-align: left;
  }
  `}
`
