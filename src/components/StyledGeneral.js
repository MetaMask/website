import Link from './Link';
import styled from 'styled-components'
export const ButtonBlue = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.lightBlue};
  border-radius: 3px;
  height: 40px;
  padding: 8px 16px;
  color: #fff;
  background: ${({ theme }) => theme.lightBlue};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  box-shadow: none;
  outline: none;
  cursor: pointer;
`
export const ButtonLinkBlue = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.lightBlue};
  border-radius: 3px;
  height: 40px;
  padding: 8px 16px;
  color: #fff;
  background: ${({ theme }) => theme.lightBlue};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  box-shadow: none;
  outline: none;
  cursor: pointer;
`

export const FooterTitle = styled.div`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.font.size.md}rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  line-height: 2.5;
  text-transform: uppercase;
`
