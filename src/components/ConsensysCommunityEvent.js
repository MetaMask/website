import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import consensysData from '../lib/api/consensys/getData'
import Loading from './Loading'

const convertDate = dateString => {
  if (!dateString) return
  const options = { month: 'short', day: 'numeric' }
  let date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}

const ConsensysCommunityEvent = props => {
  const { numberOfItem, link } = props
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    consensysData.getCommunityEvent(link).then(response => {
      try {
        if (response && response.data?.count && response.data?.results) {
          let data = response.data.results
          data = data.sort(
            (a, b) => new Date(a.start_date_iso) - new Date(b.start_date_iso)
          )
          if (numberOfItem) {
            data = data.slice(0, numberOfItem)
          }
          data = data.map(item => ({
            id: item.id,
            thumbnail: item.picture_url,
            title: item.title,
            description: item.description_short,
            date: convertDate(item.start_date_iso),
            location: item.chapter_city,
            url: item.relative_url
              ? 'https://community.consensys.io' + item.relative_url
              : null,
          }))
          setItems(data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    })
  }, [])
  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          {items ? (
            <Listing>
              {items.map((item, index) => (
                <CardEvent key={index}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="blank"
                      rel="noopener noreferrer"
                    />
                  ) : null}
                  <div className="image-wrapper">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </div>
                  <div className="card-content">
                    <div className="card-title">{item.title}</div>
                    <div className="card-info">
                      <div>{item.location}</div>
                      <div>{item.date}</div>
                    </div>
                  </div>
                </CardEvent>
              ))}
            </Listing>
          ) : (
            <div>No upcoming events</div>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default withTheme(ConsensysCommunityEvent)

ConsensysCommunityEvent.propTypes = {
  numberOfItem: PropTypes.number,
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
  flex-wrap: wrap;
  gap: 16px;

  & > * {
    width: calc(50% - 8px);

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      width: 100%;
    }
  }
`

const CardEvent = styled.div`
  display: flex;
  position: relative;
  gap: 24px;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  padding: 16px;
  a {
    position: absolute;
    inset: 0;
  }
  .image-wrapper {
    overflow: hidden;
    flex-shrink: 0;
    align-self: center;
    img {
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      width: 100px;
      vertical-align: middle;
    }
  }
  .card-content {
    width: 100%;
    padding: 8px 0;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: space-between;

    .card-title {
      text-align: left;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
    }
    .card-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      column-gap: 16px;
      row-gap: 4px;
      font-size: 14px;
    }
  }

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .image-wrapper {
      img {
        width: 150px;
      }
    }
    .card-content {
      padding: 16px 0;
      .card-title {
        font-size: 24px;
      }
      .card-info {
        justify-content: flex-start;
        gap: 24px;
      }
    }
  }
`
