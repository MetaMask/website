import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import SimpleCta from './SimpleCta'
import ConsenSysResourcesItem from './ConsenSysResourcesItem'
import consensysData from '../lib/api/consensys/getData'
import Loading from './Loading'

const ConsenSysResources = props => {
  const { numberOfItem, categoryId, linkText, link, showDate } = props
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    consensysData
      .getBlog({
        categories: categoryId || 0,
        per_page: numberOfItem || 3,
        _fields: 'title,date,link,_links.wp:featuredmedia',
        _embed: 'wp:featuredmedia',
      })
      .then(response => {
        try {
          if (response && response.length) {
            const optionsDate = { year: 'numeric', month: 'short' }
            const parseData = response.map(e => {
              const eTitle = e?.title?.rendered || ''
              const eDate = e?.date ? new Date(e.date) : null
              const eLink = e?.link || ''
              const eDateString = eDate
                ? eDate.toLocaleDateString(undefined, optionsDate)
                : null
              const eImageObj =
                e?._embedded['wp:featuredmedia'][0]?.media_details?.sizes
              const eImageFull = e?._embedded['wp:featuredmedia'][0].source_url
              const eImageList = eImageObj ? Object.values(eImageObj) : false
              const eImage =
                eImageList && eImageList.length
                  ? eImageList[eImageList.length - 2]?.source_url
                  : eImageFull
              return {
                title: eTitle,
                date: eDateString,
                image: eImage,
                link: eLink,
              }
            })
            setItems(parseData)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
        }
      })
  }, [categoryId, numberOfItem])
  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          {items && items.length ? (
            <Listing>
              {items.map((item, index) => (
                <ConsenSysResourcesItem
                  key={index}
                  {...item}
                  showDate={showDate}
                />
              ))}
            </Listing>
          ) : (
            <div>No data</div>
          )}
        </>
      )}
      {linkText && link ? (
        <CtaWrapper>
          <SimpleCta newTab text={linkText} link={link} color="#2c56dd" />
        </CtaWrapper>
      ) : null}
    </Wrapper>
  )
}

export default withTheme(ConsenSysResources)

ConsenSysResources.propTypes = {
  categoryId: PropTypes.string,
  numberOfItem: PropTypes.number,
  linkText: PropTypes.string,
  link: PropTypes.string,
  showDate: PropTypes.bool,
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
    padding: 10px;
    width: 33.33%;

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      width: 50%;
    }

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      width: 100%;
      padding: 24px 10px;
    }
  }
`

const CtaWrapper = styled.div`
  display: block;
  margin-top: 48px;
`
