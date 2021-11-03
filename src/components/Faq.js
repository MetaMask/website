import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import PlusIcon from '../images/icons/icon-plus.svg'

const Faq = props => {
  const { question, answer, activeId, setActiveId, id } = props
  const isActive = activeId === id

  return (
    <FaqItem active={isActive} onClick={() => setActiveId(!isActive ? id : '')}>
      <FaqItemInner>
        <QuestionItem>
          {question}
          <IconClose>
            <IconCloseInner active={isActive}>
              <PlusIcon />
            </IconCloseInner>
          </IconClose>
        </QuestionItem>
        <AnswerItem active={isActive}>
          <AnswerItemInner active={isActive}>
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </AnswerItemInner>
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
  display: block;
  width: 100%;
  margin-bottom: 12px;
  cursor: pointer;
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
  background-color: #037dd6;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #fff;
  border-radius: 4px;
  min-height: 80px;

  svg {
    path {
      fill: #fff;
    }
  }
`

const AnswerItem = styled.div`
  display: block;
  overflow: hidden;
  transition: max-height 500ms ease;

  ${({ active }) =>
    active
      ? `
    max-height: 200px;
  `
      : `max-height: 0;`}
`

const AnswerItemInner = styled.div`
  display: block;
  padding: 30px;
  background: #f4f6f8;
`
const IconClose = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

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

  ${({active}) => active ? 'transform: rotate(225deg);': ''}
`;