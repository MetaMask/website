import styled from 'styled-components'

export const FooterTitle = styled.div`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.font.size.md}rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  line-height: 2.5;
  text-transform: uppercase;
`
export const SectionTitle = styled.h2`
  margin-top: 40px;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 28px;
    line-height: 46px;
    margin-top: 0;
  }
`

export const Section = styled.div`
  display: block;
  padding-top: 48px;
  padding-bottom: 48px;
  position: relative;

  ${({ sectionPadding }) =>
    sectionPadding
      ? `
    padding-top: ${sectionPadding};
    padding-bottom: ${sectionPadding};
  `
      : ``}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    padding-top: 48px;
    padding-bottom: 48px;
  }

  &.noPaddingBottom, &.custom-noPaddingBottom {
    padding-bottom: 0 !important;
  }
  &.noPaddingTop, &.custom-noPaddingTop {
    padding-top: 0 !important;
  }

  &.removeSectionPaddingBottomOnDesktop {
    @media (min-width: ${({ theme }) => theme.device.tablet}){
      padding-bottom: 0 !important;
    }
  }
`

export const ModalInner = styled.div`
  border-radius: 24px;
  background-color: ${({ theme, $keepLightMode }) =>
    $keepLightMode ? theme.white : theme.background.white};
  max-height: 80vh;
  margin-right: 10px;
  margin-left: 10px;
  padding: 30px;
  overflow: auto;
  position: relative;
  max-width: 95vw;
  -webkit-overflow-scrolling: touch;

  .popupTitle {
    padding-right: 40px;
  }

  ${({ width }) =>
    width
      ? `
    width: ${width};
  `
      : ''}
  
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    max-height: 85vh;
  }

  iframe {
    width: 100%;
    height: auto;
  }
`

export const IconCloseModal = styled.span`
  display: inline-flex;
  width: 24px;
  height: 36px;
  align-items: center;
  justify-content: center;
  font-size: 20px !important;
  font-weight: bold !important;
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`

export const EyebrowStyle = styled.div`
  color: ${({ theme }) => theme.orange};
  font-weight: 700;
  letter-spacing: 5px;
  margin-bottom: 16px;

  .eyebrowSize13 & {
    font-size: 13px;
    line-height: 1.1;
  }
  .eyebrowSize18 & {
    font-size: 18px;
    line-height: 25.31px;
  }
  .eyebrowLetterSpacing3 & {
    letter-spacing: 3px;
  }
  .eyebrowLetterSpacingNormal & {
    letter-spacing: normal;
  }
  .eyebrowPurple & {
    color: ${({ theme }) => theme.lightPurple};
  }
`
