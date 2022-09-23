import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import classnames from 'classnames'
import Link from '../Link'

/**
 * @name Card
 * @summary -
 * @description - Module for card news
 */

const StyledCard = props => {
  const { title, image, link, description } = props

  return (
    <Card className="moduleCardWrapper">
      <CardInner to={link} className={classnames('custom-card-bg cardLink')}>
        {image ? (
          <ImageInner>
            <ImageWrapper>
              <ImageSrc image={image} />
            </ImageWrapper>
          </ImageInner>
        ) : null}
        <ContentInner>
          {title ? <Title>{title}</Title> : null}
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

const Card = styled.div`
  margin-top: 16px;
`

const CardInner = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${({ theme }) => theme.text.dark};
  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }
`

const ImageInner = styled.div`
  height: 0;
  padding: 0 0 56%;
  position: relative;
`

const ImageWrapper = styled.div`
  display: block;
  border-radius: 12px;
  height: 100%;
  max-width: 100%;
  padding: 10px 16px;
  position: absolute;
  width: 100%;

  body.light-mode & {
    background: #f2f4f6;
  }

  body.dark-mode & {
    background: #f2f4f615;
  }
`

const ImageSrc = styled(Image)`
  border-radius: 12px;
  display: block;
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin-top: 24px;
  min-height: 0;
  flex: 1;
  width: 100%;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Description = styled.div`
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &:not(:last-child) {
    margin-bottom: 64px;
  }

  p:last-child {
    margin-bottom: 0;
  }
  body.light-mode & {
    color: #535a61;
  }
`
