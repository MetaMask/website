import React from 'react'
import Button from './Button'
// import { MetaMaskButton } from '@metamask/sdk-react'
const ConnectMetaMask = props => {
  return (
    // <MetaMaskButton>
    <Button text={'Connect with MetaMask'} link={'#'} fontSize={'20px'} />
    // </MetaMaskButton>
  )
}

export default ConnectMetaMask
