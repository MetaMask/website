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
  padding-top: 40px;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 40px;
    line-height: 46px;
    padding-top: 0;
  }
`

export const Section = styled.div`
  display: block;
  padding-top: 48px;
  padding-bottom: 48px;
  position: relative;
  transition: all 300ms ease;

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

  &.noPaddingBottom {
    padding-bottom: 0 !important;
  }
`

export const ModalInner = styled.div`
  border-radius: 24px;
  background-color: #fff;
  max-height: 80vh;
  margin-right: 10px;
  margin-left: 10px;
  padding: 30px;
  overflow: auto;
  position: relative;
  max-width: 90vw;

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
