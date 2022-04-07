import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import fetchConsensysData from '../lib/utils/fetchConsensysData'
import SimpleCta from './SimpleCta'
import ConsenSysResourcesItem from './ConsenSysResourcesItem';

const ConsenSysResources = props => {
  const { numberOfItem, categoryId, linkText, link, showDate } = props
  const [items, setItems] = React.useState([])
  const getData = async () => {
    const data = await fetchConsensysData('/posts', {
      categories: categoryId,
      per_page: numberOfItem,
      _fields: 'title,date,link,_links.wp:featuredmedia',
      _embed: 'wp:featuredmedia',
    })
    if (data && data.length) {
      const optionsDate = { year: 'numeric', month: 'short' }
      const parseData = data.map(e => {
        const eTitle = e?.title?.rendered || ''
        const eDate = e?.date ? new Date(e.date) : null
        const eDateString = eDate
          ? eDate.toLocaleDateString(undefined, optionsDate)
          : null
        const eImage = e?._embedded['wp:featuredmedia'][0].source_url
        return {
          title: eTitle,
          date: eDateString,
          image: eImage,
        }
      })
      setItems(parseData)
    }
  }
  React.useEffect(() => {
    getData()
  }, [])
  return (
    <Wrapper>
      {items && items.length ? (
        <Listing>
          {items.map(item => (
            <ConsenSysResourcesItem {...item} showDate={showDate} />
          ))}
        </Listing>
      ) : null}
      {linkText && link ? (
        <CtaWrapper>
          <SimpleCta text={linkText} link={link} color="#2c56dd" />
        </CtaWrapper>
      ) : null}
    </Wrapper>
  )
}

export default withTheme(ConsenSysResources)

ConsenSysResources.propTypes = {
  title: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  backgroundColor: PropTypes.string,
}

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
`

const Listing = styled.div`
  display: flex;
  flex-flow: wrap;
  margin: -10px;

  & > * {
    width: 33.33%;
    padding: 10px;
  }
`

const CtaWrapper = styled.div`
  display: block;
  margin-top: 48px;
`