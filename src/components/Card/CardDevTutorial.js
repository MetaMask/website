import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Link from '../Link'
import Image from '../Image'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'

const StyledCard = props => {
  const {
    title,
    link,
    description,
    image,
    imageDarkMode,
    cta,
    previewMode,
    customClass,
    ...rest
  } = props

  return (
    <Card
      className={classnames('moduleCardWrapper', {
        [customClass]: customClass,
      })}
      {...rest}
    >
      <CardInner to={link}>
        <ContentInner>
          {image ? (
            <ImageWrapper>
              <ImageSrc
                image={image}
                darkImage={imageDarkMode}
                previewMode={previewMode}
              />
            </ImageWrapper>
          ) : null}
          {title ? <Title>{title}</Title> : null}
          {description ? (
            <Description>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Description>
          ) : null}
          {cta ? (
            <CTAWrapper>
              {cta.map(cta =>
                contentfulModuleToComponent({
                  ...cta,
                  previewMode,
                })
              )}
            </CTAWrapper>
          ) : null}
        </ContentInner>
      </CardInner>
    </Card>
  )
}

export default StyledCard

StyledCard.propTypes = {
  body: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageMargin: PropTypes.bool,
}

const Card = styled.div`
  height: auto;
`

const CardInner = styled(Link)`
  height: 100%;
`

const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 16px;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  height: 100%;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  text-align: left;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 24px;
  }
`

const Description = styled.div`
  font-size: 14px;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 18px;
  }
`

const ImageWrapper = styled.div`
  img {
    height: 100%;
    width: auto;
    border-radius: 6px;
  }
`

const ImageSrc = styled(Image)`
  display: block;
  height: 100%;
`

const CTAWrapper = styled.div`
  display: flex;
  column-gap: 24px;
  row-gap: 8px;
  height: 100%;
  align-items: end;
`
