import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Link from '../Link'

const StyledCard = props => {
  const { title, link, description } = props

  return (
    <Card className="moduleCardWrapper">
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

const Description = styled.div`
  color: #037dd6;
  font-weight: 600;
  font-size: 20px;

  p:last-child {
    margin-bottom: 0;
  }
`
