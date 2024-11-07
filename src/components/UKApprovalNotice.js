import React from 'react'

import styled, { withTheme } from 'styled-components'
import { useCountry } from '../hooks/useCountry'

const UKApprovalNotice = props => {
  const { ukApproved = false, ukApprovalText } = props
  const country = useCountry()

  return (
    ukApproved &&
    country === 'GB' && (
      <NoticeWrapper>
        <NoticeContainer>{ukApprovalText}</NoticeContainer>
      </NoticeWrapper>
    )
  )
}

export default withTheme(UKApprovalNotice)

const NoticeContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  line-height: 22px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: var(--container-width-miniDesktop);
  }
`
const NoticeWrapper = styled.div`
  padding: 20px;
`
