import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import PlusIcon from '../images/icons/icon-plus.svg'
import AnimateHeight from 'react-animate-height'
import Context from '../Context/ContextPage'

const Faq = props => {
  const { faq: faqContextValue } = React.useContext(Context)
  const { question, answer, id, backgroundColor, containerBgColor } = props
  const { idFaqActive: activeId, setIdFaqActive: setActiveId } = faqContextValue || {}
  const isActive = activeId === id

  return (
    <FaqItem active={isActive} onClick={() => setActiveId(!isActive ? id : '')}>
      <FaqItemInner>
        <QuestionItem backgroundColor={backgroundColor} active={isActive}>
          {question}
          <IconClose>
            <IconCloseInner active={isActive}>
              <PlusIcon />
            </IconCloseInner>
          </IconClose>
        </QuestionItem>
        <AnswerItem>
          <AnimateHeight
            duration={500}
            height={isActive ? 'auto' : '0'} // see props documentation below
          >
            <AnswerItemInner containerBgColor={containerBgColor}>
              <div dangerouslySetInnerHTML={{ __html: answer }} />
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
}

const FaqItem = styled.div`
  cursor: pointer;
  display: block;
  width: 100%;
  margin-bottom: 12px;
`

const FaqItemInner = styled.div`
  display: block;
  width: 100%;
`

const QuestionItem = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.darkBlue};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #fff;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 80px;
  text-align: left;

  ${({ backgroundColor, theme }) =>
    backgroundColor === 'gradient'
      ? `background-image: ${theme.gradientFAQ};
         font-weight: 400;`
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
  background: #f4f6f8;
  text-align: left;

  p:last-child {
    margin-bottom: 0;
  }

  ${({ containerBgColor }) =>
    containerBgColor === 'gray' ? `background: #ffffff;` : ''}

  ${({ containerBgColor }) =>
    containerBgColor === 'dark' || containerBgColor === 'darkGray'
      ? `background: #4c4c4c;`
      : ''}
  
  
  a {
    color: ${({ theme }) => theme.linkColor};
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
