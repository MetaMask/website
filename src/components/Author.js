import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import Link from './Link'
import ContextClientSide from '../Context/ContextClientSide'

/**
 * @name Author
 * @summary -
 * @description - Module for blog content
 */

const Author = props => {
  const { name, image, imageDarkMode, link, date } = props
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}

  return (
    <AuthorWrapper>
      <AuthorInner to={link} newTab>
        {image ? (
          <ImageWrapper>
            <ImageSrc
              image={isDarkMode && imageDarkMode ? imageDarkMode : image}
            />
          </ImageWrapper>
        ) : null}
        <Inner>
          <InnerContent>
            {name ? <Name>{name}</Name> : null}
            {date ? <Date>{date}</Date> : null}
          </InnerContent>
        </Inner>
      </AuthorInner>
    </AuthorWrapper>
  )
}

export default Author

Author.propTypes = {
  name: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  date: PropTypes.string,
}

const AuthorWrapper = styled.div`
  display: block;
`

const AuthorInner = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.body};
`

const ImageWrapper = styled.div`
  height: 40px;
  margin-right: 12px;
  img {
    height: 100%;
    width: auto;

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin: 0 auto;
    }
  }
`

const ImageSrc = styled(Image)`
  display: block;
`

const Inner = styled.div`
  display: block;
`

const InnerContent = styled.div`
  display: block;
`

const Name = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.text.title};
`

const Date = styled.div`
  color: ${({ theme }) => theme.text.title};
`
