import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
const Home = () => {
  
  return (
    <>
      <Navbar />
      
      <Outlet />
    </>
  )
}

export default Home