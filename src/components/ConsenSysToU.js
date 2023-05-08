import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { Section } from './StyledGeneral'

const ConsenSysToU = ({ touData }) => {
  return (
    <Section>
      <ContentWrapper>
        <WrapperInner>
          <h1
            className="title"
            dangerouslySetInnerHTML={{
              __html: touData.title || 'Terms of use',
            }}
          />
          <h2
            className="description"
            dangerouslySetInnerHTML={{
              __html: touData.description || 'Last Updated: ',
            }}
          />
          <div
            dangerouslySetInnerHTML={{ __html: touData.content || 'No Data' }}
          />
        </WrapperInner>
      </ContentWrapper>
    </Section>
  )
}

export default ConsenSysToU

ConsenSysToU.propTypes = {
  touData: PropTypes.object,
}

const WrapperInner = styled.div`
  h1.title {
    text-align: center;
    & > p {
      margin-bottom: 0;
    }
  }

  h2.description {
    font-weight: 400;
    text-align: center;
    margin-bottom: 32px;
    font-size: 16px;
  }

  h3,
  h4 {
    margin: 24px 0;
  }
`
