import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const CardDelegationFeature = props => {
  const { title, description } = props
  return (
    <Card>
      <CardInner className="bg-gray">
        {title ? <Title>{title}</Title> : null}
        {description ? (
          <Description>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Description>
        ) : null}
      </CardInner>
    </Card>
  )
}

CardDelegationFeature.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default CardDelegationFeature

const Card = styled.div``

const CardInner = styled.div`
  padding: 28px;
  min-height: 333px;
  height: 100%;

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    min-height: auto;
    padding: 16px;
  }
  `}
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
