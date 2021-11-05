import React from 'react'
import styled, { withTheme } from 'styled-components'
import Image from '../Image'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'

const TabContentDownload = props => {
  const { image, title, ctas, ctaHeading } = props
  return (
    <>
      {title ? <Heading>{title}</Heading> : null}
      {image ? (
        <ImageWrapper>
          <Image image={image} />
        </ImageWrapper>
      ) : null}
      <DownLoadWrapper>
      {ctaHeading ? (
        <HeadingCta>
          {ctaHeading}
        </HeadingCta>
      ) : null}
        <Buttons>
          {ctas && ctas.length
            ? ctas.map(cta => contentfulModuleToComponent(cta))
            : null}
        </Buttons>
      </DownLoadWrapper>
    </>
  )
}

export default withTheme(TabContentDownload)

const Heading = styled.h1`
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  padding: 20px 0;
`

const ImageWrapper = styled.div`
  width: 664px;
  max-width: 100%;
  margin: 20px auto 0;
`
const DownLoadWrapper = styled.div`
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 8px 1px #dbdbdb;
  position: relative;
`

const Buttons = styled.div`
  display: flex;

  & > * {
    margin: 0 20px;

    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      margin: 0 60px;
      a {
        font-size: 20px !important;
        height: 46px !important;
      }
    }
  }
`
const HeadingCta = styled.div`
  font-family: 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif;
  font-size: 24px;
  margin-bottom: 40px;
  line-height: 1.3;
`