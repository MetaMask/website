import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import Link from './Link'

const ConsenSysResources = props => {
  const { title, image, date, showDate, link } = props

  return (
    <Item>
      <InnerLink to={link} newTab>
        <Image>
          <img src={image} alt="" />
        </Image>
        <Inner>
          {showDate && date ? <Date>{date}</Date> : null}
          {title ? <Title>{title}</Title> : null}
        </Inner>
      </InnerLink>
    </Item>
  )
}

export default withTheme(ConsenSysResources)

ConsenSysResources.propTypes = {
  title: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  backgroundColor: PropTypes.string,
}

const InnerLink = styled(Link)`
  display: block;
`

const Item = styled.div`
  display: block;
`

const Image = styled.div`
  display: block;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;

  &:before {
    content: '';
    display: block;
    padding-bottom: 60.75%;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`
const Inner = styled.div`
  display: block;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4;
  color: ${({ theme }) => theme.text.title};
`

const Date = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 14px;
  text-transform: uppercase;
  color: #2c56dd;
  margin-bottom: 12px;
`
