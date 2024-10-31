import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const CardUseCase = props => {
  const { title, description, backgroundColor = 'gray' } = props
  return (
    <Card>
      <CardInner className={`bg-${backgroundColor}`}>
        {title && <Title>{title}</Title>}
        {description && (
          <Description>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Description>
        )}
      </CardInner>
    </Card>
  )
}

CardUseCase.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default CardUseCase

const Card = styled.div``

const CardInner = styled.div`
  padding: 28px;
  height: 100%;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.4;
  margin-bottom: 12px;

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
