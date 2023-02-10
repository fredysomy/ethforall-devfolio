import React from 'react'
import { Heading, Center } from '@chakra-ui/react';
import { useEth } from '../context/EthContext';

const Redeem = () => {
    const {account: [account]} = useEth();

  return (
    <Center width="100vw" minHeight="80vh">
        {account ? <Heading>Redeem</Heading> : <Heading>Account Not Connected</Heading>}
    </Center>
  )
}

export default Redeem