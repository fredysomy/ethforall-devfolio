import React from "react";
import { Heading, Center } from "@chakra-ui/react";
import { useEth } from "../context/EthContext";
import { useAuth } from "@arcana/auth-react";
const MyServices = () => {
  const auth = useAuth();
  const account =
    auth.loading === true
      ? auth.isLoggedIn === true
        ? auth.user.address
        : null
      : null;
  return (
    <Center width="100vw" minHeight="80vh">
      {auth.loading ? (
        <>
          <Heading>Loading</Heading>
        </>
      ) : (
        <>
          {auth.isLoggedIn ? (
            <>
              <Heading>loggedin</Heading>
            </>
          ) : (
            <>
              <Heading>Not Logged</Heading>
            </>
          )}
        </>
      )}
    </Center>
  );
};

export default MyServices;
