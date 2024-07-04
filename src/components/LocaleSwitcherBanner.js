import React, { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Wrapper from './ContentWrapper'
import { getLocalizedPath, LOCALES } from '../lib/config.mjs'
import { setLocalStorage, getLocalStorage } from '../lib/utils/localStorage'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import useLangDetect from '../hooks/useLangDetect'
import ContextClientSide from '../Context/ContextClientSide'
import { IconCloseModal } from './StyledGeneral'
import sanitizeHtml from 'sanitize-html'

const LocaleSwitcherBanner = () => {
  const detectedLang = useLangDetect()

  const { localization } = useContext(ContextClientSide)
  const { locale, setLocale } = localization || {}

  const [dropdownLang, setDropdownLang] = useState()

  const [showBanner, setShowBanner] = useState(false)

  const location = useLocation()
  const { pathname } = location

  const handleChangeLocale = e => {
    setDropdownLang(e.target.value)
  }

  const handleClickContinue = () => {
    const sanitizedDropdownLang = sanitizeHtml(dropdownLang)
    setLocale(LOCALES.find(l => l.code === sanitizedDropdownLang))

    const localizedPath = getLocalizedPath(pathname, sanitizedDropdownLang)

    setLocalStorage('preferredLanguage', sanitizedDropdownLang)
    setLocalStorage('locale-opt-out', true)
    setShowBanner(false)

    navigate(localizedPath, { replace: true })
  }

  const handleExit = () => {
    setLocalStorage('locale-opt-out', true)
    setShowBanner(false)
  }

  useEffect(() => {
    const isOptOut = getLocalStorage('locale-opt-out') === 'true'
    const detectedLangCode = detectedLang?.code
    if (
      !isOptOut &&
      detectedLangCode &&
      locale.code &&
      detectedLangCode !== locale.code
    ) {
      setShowBanner(true)
      setDropdownLang(detectedLangCode)
    }
  }, [detectedLang])

  useEffect(() => {
    const isOptOut = getLocalStorage('locale-opt-out') === 'true'
    const localLanguage = getLocalStorage('preferredLanguage')
    const storedLanguage = LOCALES.find(f => f.code === localLanguage)

    if (isOptOut && storedLanguage && storedLanguage.code !== locale.code) {
      setLocale(storedLanguage)
      const localizedPath = getLocalizedPath(pathname, storedLanguage.code)

      navigate(localizedPath, { replace: true })
    }
  }, [])

  if (!showBanner) return null

  return (
    <BannerWrapper>
      <Wrapper size="wide">
        <div className="wrapper-inner">
          <p className="text">Would you like to see this page in</p>
          <div className="action">
            <select
              onChange={handleChangeLocale}
              defaultValue={detectedLang?.code}
            >
              {LOCALES.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.localizedName}
                </option>
              ))}
            </select>
            <button className="btn-continue" onClick={handleClickContinue}>
              Continue
            </button>
            <IconCloseModal
              className={'w-icon w-icon-close btn-exit'}
              onClick={handleExit}
            />
          </div>
        </div>
      </Wrapper>
    </BannerWrapper>
  )
}

const slideup = keyframes`
  0% {
    bottom: -72px;
  }
  100% {
    bottom: 0;
  }
`

const BannerWrapper = styled.aside`
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.darkBlue};
  width: 100%;
  color: #fff;
  z-index: 1000;
  bottom: -72px;
  animation: ${slideup} 0.25s ease-out 0.25s forwards 1;

  .wrapper-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    column-gap: 12px;
    row-gap: 6px;
    height: 100%;
    padding: 10px 0;

    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      flex-direction: row;
      padding: 14px 0;
    }
  }

  .text {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0;
  }

  .action {
    display: flex;
    gap: 12px;

    select {
      border-radius: 8px;
      font-size: 14px;
      padding: 0 2px;

      &:focus {
        outline: none;
      }
    }

    .btn-continue {
      cursor: pointer;
      background-color: #f5f5f7;
      color: #000;
      border: none;
      border-radius: 8px;
      transition: background-color 240ms cubic-bezier(0.4, 0, 0.6, 1);
      font-size: 14px;

      &:hover {
        background-color: #fff;
      }
    }

    .btn-exit {
      position: unset;
      height: unset;
      color: #f5f5f7;
      transition: color 240ms cubic-bezier(0.4, 0, 0.6, 1);
      font-size: 14px !important;

      &:hover {
        color: #fff;
      }
    }
  }
`

export default LocaleSwitcherBanner
