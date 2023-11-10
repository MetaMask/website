import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Link from '../Link'
import Image from '../Image'

const StyledCard = props => {
  const {
    title,
    link,
    description,
    image,
    imageDarkMode,
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
          <div className="title-wrapper">
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
          </div>
          {description ? (
            <Description>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Description>
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

const Card = styled.div``

const CardInner = styled(Link)`
  height: 100%;
`

const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 16px;
  padding: 16px;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  height: 100%;

  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 24px;
  }
`

const Description = styled.div`
  font-size: 14px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #037dd633;
  background-color: #037dd60a;
  text-align: left;

  a {
    display: inline-block;
    font-weight: 600;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 18px;
  }
`

const ImageWrapper = styled.div`
  height: 24px;
  flex-shrink: 0;
  img {
    height: 100%;
    width: auto;
  }
`

const ImageSrc = styled(Image)`
  display: block;
  height: 100%;
`
