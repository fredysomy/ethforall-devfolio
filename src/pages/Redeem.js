import React from 'react'
import { Heading, Center } from '@chakra-ui/react';
import { useEth } from '../context/EthContext';
import { useAuth } from '@arcana/auth-react';
const Redeem = () => {
    const auth=useAuth();

  return (
   <Center>
     {
      auth.loading ? <>
        <Heading>Loading</Heading>
      </>
      : <>
        {
          auth.isLoggedIn ? <>
            <Heading>loggedin</Heading>
          </>
          : <>
            <Heading>Not Logged</Heading>
          </>
        }
      </>
    }
   </Center>
  )
}

export default Redeem