import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import classnames from 'classnames'
import Link from '../Link'

const StyledCard = props => {
  const { title, link, description, customClass, ...rest } = props

  return (
    <Card
      className={classnames('moduleCardWrapper', {
        [customClass]: customClass,
      })}
      {...rest}
    >
      <CardInner to={link} className={classnames('custom-card-bg cardLink')}>
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
  padding: 12px;
  box-shadow: -15px 15px 24px rgba(0, 0, 0, 0.05),
    -3px 3px 10px rgba(0, 0, 0, 0.07);
  border-radius: 6px;

  body.dark-mode & {
    background-color: ${({ theme }) => theme.dark};
  }
`

const CardInner = styled(Link)``

const ContentInner = styled.div``

const Title = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 4px;
`

const gradient = keyframes`
	to {
    background-position-x: -200%;
  }
`

const Description = styled.div`
  color: #037dd6;
  font-weight: 600;
  font-size: 20px;

  p:last-child {
    margin-bottom: 0;
  }

  .blurry & {
    position: relative;
    &:after {
      content: '';
      background: linear-gradient(90deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      position: absolute;
      background-size: 200% 100%;
      inset: 0;
      border-radius: 6px;
      animation: 1.5s ${gradient} linear infinite;
    }
  }
`
