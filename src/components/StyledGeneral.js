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
`;

export const Section = styled.div`
  position: relative;
  display: block;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ sectionPadding }) =>
  sectionPadding
      ? `
    padding-top: ${sectionPadding};
    padding-bottom: ${sectionPadding};
  `
      : ``}

  @media (max-width: ${({theme}) => theme.device.tabletMediaMax}){
    padding-top: 24px;
    padding-bottom: 24px;
  }

  &.noPaddingBottom {
    padding-bottom: 0;
  }
`;

export const HubspotModal = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  padding: 30px;
  border-radius: 24px;
  background-color: #fff;
  width: 100%;
  position: relative;
`;

export const IconCloseModal = styled.span`
  display: inline-flex;
  width: 24px;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;