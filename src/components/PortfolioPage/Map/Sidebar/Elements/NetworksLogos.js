import React from 'react'
import styled from 'styled-components'
import Image from '../../../../Image'

/**
 * @name NetworksLogos
 * @summary -
 * @description - Portfolio page - Networks Logos
 */

const NetworksLogos = props => {
  const { logosList } = props

  return (
    <Networks>
      {logosList?.map(({ title, logo }, i) => {
        return (
          <Network key={i}>
            <NetworkInner>
              <NetworkIconWrapper>
                <NetworkIcon>
                  <NetworkIconImage src={logo?.url || logo?.file?.url} />
                </NetworkIcon>
              </NetworkIconWrapper>
              <NetworkLabel>{title}</NetworkLabel>
            </NetworkInner>
          </Network>
        )
      })}
    </Networks>
  )
}

export default NetworksLogos

const Networks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  gap: 37px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    gap: 37px 0;
  }
`

const Network = styled.li`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  width: 52px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    gap: 0;
    min-width: 33.33%;
    max-width: 33.33%;
    flex-basis: 33.33%;

    &:nth-child(3n + 1) {
      justify-content: flex-start;
    }

    &:nth-child(3n + 2) {
      justify-content: center;
    }

    &:nth-child(3n) {
      justify-content: flex-end;
    }
  }
`

const NetworkInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const NetworkIconWrapper = styled.div`
  position: relative;
  width: 52px;
  height: 45px;
  display: flex;
  justify-content: center;
`

const NetworkIcon = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
`

const NetworkIconImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const NetworkLabel = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 52px;
  }
`
