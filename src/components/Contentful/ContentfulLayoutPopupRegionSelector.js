import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Convert ISO country code to emoji
const isoToEmoji = code =>
  code
    .split('')
    .map(letter => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map(emojiCode => String.fromCodePoint(emojiCode))
    .join('')

const Modal = ({ list, title, text, setHasModal, setSelectedCountry }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return createPortal(
    <ModalWrapper
      onClick={e => {
        if (e.target === e.currentTarget) setHasModal(false)
      }}
    >
      <div className="center">
        <h3>{title}</h3>
        <p>{text}</p>

        <form class="input-container" onReset={setSearchTerm.bind(this, '')}>
          <input
            type="search"
            name="search"
            placeholder="Search for a country"
            onChange={e =>
              setSearchTerm(
                e.target.value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
              )
            }
          />
          {searchTerm.length > 0 && <button type="reset">×</button>}
        </form>

        <ul>
          {list
            .filter(item => item.providers.length > 0)
            .map(filteredItem => (
              <li
                key={filteredItem.country.id}
                className={
                  filteredItem.country.name.search(
                    new RegExp(searchTerm, 'i')
                  ) < 0
                    ? 'hidden'
                    : ''
                }
                onClick={() => {
                  setSelectedCountry(list.indexOf(filteredItem))
                  setHasModal(false)
                }}
              >
                <span className="flag">
                  {isoToEmoji(filteredItem.country.id.replace('/regions/', ''))}{' '}
                </span>
                {filteredItem.country.name}
              </li>
            ))}
        </ul>
      </div>
    </ModalWrapper>,
    document.body
  )
}

const ContentfulLayoutPopupRegionSelector = ({
  headline,
  title,
  text,
  extraData,
  modulesRender,
  setModulesRender,
}) => {
  polyfillCountryFlagEmojis()

  const { list } = JSON.parse(extraData.internal.content)

  const [hasModal, setHasModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(0)

  useEffect(() => {
    setModulesRender(() =>
      modulesRender.current.filter(module =>
        list[selectedCountry].providers.some(item => item.name === module.title)
      )
    )
  }, [selectedCountry])

  return (
    <Wrapper>
      <span>{headline}</span>

      <OpenPopupBtn
        onClick={() => setHasModal(true)}
        data-flag={isoToEmoji(
          list[selectedCountry].country.id.replace('/regions/', '')
        )}
      >
        {list[selectedCountry].country.name}
      </OpenPopupBtn>

      {hasModal && (
        <Modal
          list={list}
          title={title}
          text={text}
          setHasModal={setHasModal}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </Wrapper>
  )
}

export default ContentfulLayoutPopupRegionSelector

ContentfulLayoutPopupRegionSelector.propTypes = {
  headline: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
}

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text.default};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 137.5%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`

const OpenPopupBtn = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.text.title};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  display: inline-flex;
  margin: 11px 0 63px;
  padding: 16px 72px 16px 16px;
  border-radius: 40px;
  border: 1px solid #bbc0c5;
  background: url('/images/selector/arrow-down.svg') calc(100% - 16px) center /
    16px no-repeat;

  body.dark-mode & {
    background: url('/images/selector/arrow-down-w.svg') calc(100% - 16px)
      center / 16px no-repeat;
  }

  &::before {
    content: attr(data-flag);
    display: block;
    font-family: 'Twemoji Country Flags', 'Helvetica', 'Comic Sans', serif;
    margin-right: 8px;
  }
`

const ModalWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  .center {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 480px;
    max-width: 90%;
    padding: 24px 0 0;
    background: ${({ theme }) => theme.background.white};
    border-radius: 24px;

    h3 {
      color: ${({ theme }) => theme.text.title};
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      text-align: center;
      padding: 0 24px;
    }

    p {
      text-align: center;
      margin: 0;
      padding: 0 24px;
    }

    .input-container {
      color: ${({ theme }) => theme.text.darkGray};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      position: relative;
      width: calc(100% - 48px);
      height: 56px;
      margin: 0 auto;

      input[type='search'] {
        color: currentColor;
        outline: none;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        padding: 0 32px 0 52px;
        border: 1px solid ${({ theme }) => theme.linkColor};
        background: url('/images/selector/search.svg') 16px center / 24px
          no-repeat;
      }

      button[type='reset'] {
        color: ${({ theme }) => theme.text.darkGray};
        font-weight: 400;
        font-size: 24px;
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 16px;
        margin: auto;
        border: 0;
        background: none;
      }
    }

    ul {
      overflow-y: auto;
      list-style: none;
      height: 175px;
      width: calc(100% - 24px);
      margin: 0 auto;

      @media (min-width: ${({ theme }) => theme.device.mobile}) {
        height: 400px;
      }

      li {
        cursor: pointer;
        display: flex;
        gap: 12px;
        flex-flow: row nowrap;
        margin: 0;
        padding: 8px 12px;
        border-radius: 8px;
        transition: background 0.1s linear;

        &:hover {
          background: ${({ theme }) => theme.background.tabModuleOuter};
        }

        .flag {
          font-size: 24px;
        }
      }
    }
  }
`
