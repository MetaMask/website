import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import PlusIcon from '../images/icons/icon-plus.svg'
import AnimateHeight from 'react-animate-height'
import Context from '../Context/ContextPage'
import ParseMD from './ParseMD'

const Faq = props => {
  const { faq: faqContextValue } = React.useContext(Context)
  const {
    question,
    answer,
    id,
    backgroundColor,
    containerBgColor,
    previewMode = false,
    bordered,
  } = props
  const { idFaqActive: activeId, setIdFaqActive: setActiveId } =
    faqContextValue || {}
  const isActive = activeId === id

  return (
    <FaqItem active={isActive}>
      <FaqItemInner $bordered={bordered}>
        <QuestionItem
          backgroundColor={backgroundColor}
          active={isActive}
          $bordered={bordered}
          onClick={() => setActiveId(!isActive ? id : '')}
        >
          {question}
          <IconClose className="icon">
            <IconCloseInner active={isActive}>
              <PlusIcon />
            </IconCloseInner>
          </IconClose>
        </QuestionItem>
        <AnswerItem>
          <AnimateHeight
            duration={500}
            height={isActive ? 'auto' : 0} // see props documentation below
          >
            <AnswerItemInner
              className="anwser-item-inner"
              containerBgColor={containerBgColor}
              $bordered={bordered}
            >
              {previewMode ? (
                <ParseMD>{answer}</ParseMD>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: answer }} />
              )}
            </AnswerItemInner>
          </AnimateHeight>
        </AnswerItem>
      </FaqItemInner>
    </FaqItem>
  )
}

export default withTheme(Faq)

Faq.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  previewMode: PropTypes.bool,
}

const FaqItem = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 12px;
`

const FaqItemInner = styled.div`
  display: block;
  width: 100%;

  ${({ $bordered }) =>
    $bordered
      ? `
        border: 1px solid #BBC0C5;
        overflow: hidden;
        border-radius: 16px;
      `
      : ''}
`

const QuestionItem = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.primaryColor};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #fff;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 80px;
  text-align: left;
  cursor: pointer;

  ${({ $bordered }) =>
    $bordered
      ? `
        border-radius: 0;
        border-bottom: 0;
      `
      : ''}

  ${({ backgroundColor, theme }) =>
    backgroundColor === 'gradient'
      ? `background-image: ${theme.gradientFAQ};
         font-weight: 400;`
      : ''}

  ${({ backgroundColor }) =>
    backgroundColor === 'white'
      ? `
        background-color: ${backgroundColor};
        color: #000;
        .icon svg > path {
          fill: #000;
        }
      `
      : ''}

  ${({ active }) =>
    active
      ? `
      border-radius: 4px 4px 0 0;
    `
      : ``}


  svg {
    path {
      fill: #fff;
    }
  }
`

const AnswerItem = styled.div`
  display: block;
`

const AnswerItemInner = styled.div`
  border-radius: 0 0 4px 4px;
  display: block;
  padding: 30px;
  background: ${({ theme }) => theme.background.faqAnswer};
  text-align: left;

  p:last-child {
    margin-bottom: 0;
  }

  ${({ containerBgColor, theme }) =>
    containerBgColor === 'gray'
      ? `background: ${theme.background.faqAnswerCustom1};`
      : ''}

  ${({ containerBgColor, theme }) =>
    containerBgColor === 'dark' || containerBgColor === 'darkGray'
      ? `background: ${theme.background.faqAnswerCustom2};`
      : ''}
  
  
  a {
    color: ${({ theme }) => theme.linkColor};
  }

  ${({ $bordered }) =>
    $bordered
      ? `
        padding: 20px;
        padding-top: 0;
      `
      : ''}

  .snaps-faqs & {
    background-color: #fff;
  }
`
const IconClose = styled.div`
  min-width: 24px;
  width: 24px;
  height: 24px;
  position: relative;
  margin-left: 8px;
`

const IconCloseInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 400ms ease;

  ${({ active }) => (active ? 'transform: rotate(225deg);' : '')}
`
