import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

/**
 * @name AutoscaleText
 * @summary -
 * @description -
 */
const AutoscaleText = props => {
  const { Component, children } = props
  const textEl = React.createRef()
  const [font, setFont] = useState({
    fontSize: 0,
    textHeight: 0,
    maximumElHeight: 0,
  })

  const getFontSize = el => {
    if ('undefined' !== typeof window && el instanceof Element) {
      const elStyles = window.getComputedStyle(el, null)
      return parseFloat(elStyles.fontSize)
    }
    return null
  }

  const resizeFont = (el, int) => {
    if (el instanceof Element && Number(int)) {
      const size = getFontSize(el)
      el.style.fontSize = `${size + parseFloat(int)}px`
    }
    return el
  }

  const getMaxElHeight = (fontSize, maxLineCount, lineHeight) =>
    fontSize * maxLineCount * lineHeight

  const scaleText = () => {
    // make sure dom manipulation only happens on browser
    if ('undefined' !== typeof window && textEl) {
      const { minFontSize, lineHeight, maxLineCount } = props
      const text = textEl.current

      if (
        font.textHeight > font.maximumElHeight &&
        font.fontSize - 4 > minFontSize
      ) {
        resizeFont(text, -4)
        // set new font state
        let fontSize = getFontSize(text)
        let textHeight = text.clientHeight
        let maximumElHeight = getMaxElHeight(fontSize, maxLineCount, lineHeight)

        setFont({
          fontSize: fontSize,
          textHeight: textHeight,
          maximumElHeight: maximumElHeight,
        })
      }
    }
  }

  useEffect(() => {
    // adding event listeners on mount here
    if ('undefined' !== typeof window && textEl) {
      const { lineHeight, maxLineCount } = props

      const text = textEl.current
      // initialize variables for iteration
      let fontSize = getFontSize(text)
      let textHeight = text.clientHeight
      let maximumElHeight = getMaxElHeight(fontSize, maxLineCount, lineHeight)
      setFont({
        fontSize: fontSize,
        textHeight: textHeight,
        maximumElHeight: maximumElHeight,
      })
    }
  }, [])
  useEffect(() => {
    scaleText()
  }, [font.fontSize])
  return (
    <Component ref={textEl} fontSize={font.fontSize} {...props}>
      {children}
    </Component>
  )
}

AutoscaleText.propTypes = {
  Component: PropTypes.elementType,
  minFontSize: PropTypes.number,
  lineHeight: PropTypes.number, // a float representing percentage value e.g. 1.1 = 110%
  maxLineCount: PropTypes.number,
}
AutoscaleText.defaultProps = {
  minFontSize: 36,
  lineHeight: 1.1,
  maxLineCount: 4,
}
export default AutoscaleText
