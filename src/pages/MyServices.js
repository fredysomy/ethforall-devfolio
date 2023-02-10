import React from 'react'
import { Heading, Center } from '@chakra-ui/react';
import { useEth } from '../context/EthContext';

const MyServices = () => {
    const {account: [account]} = useEth();

  return (
    <Center width="100vw" minHeight="80vh">
        {account ? <Heading>My Services</Heading> : <Heading>Account Not Connected</Heading>}
    </Center>
  )
}

export default MyServices