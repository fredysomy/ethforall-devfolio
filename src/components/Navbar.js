import React, { useState } from "react";
import { Link, Button, Flex, Spacer, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEth } from "../context/EthContext";
import { Auth, useAuth } from "@arcana/auth-react";

const Navbar = () => {
  const auth = useAuth();
  let loggedin = auth.isLoggedIn;
  const logoSize = "35px";

  const links = [
    { name: "Donate", to: "donate" },
    { name: "Create Services", to: "create-services" },
    { name: "My Services", to: "my-services" },
    { name: "Redeem", to: "redeem" },
    { name: "Chat", to: "chat" },
  ];
  const logout = async () => {
    await auth.logout();
    loggedin = auth.isLoggedIn;
  };
  const linkStyles = {
    fontSize: "18px",
    textDecoration: "none",
    color: "black",
    borderRadius: "4px",
    _hover: {
      // background: "blue",
      color: "blue",
    },
    paddingX: "16px",
    paddingY: "8px",
  };

  return (
    <Flex
      paddingY="16px"
      paddingX="16px"
      gap="30px"
      borderBottomColor="black"
      bg="white"
      marginBottom="30px"
      boxShadow="lg"
      position="sticky"
    >
      <Image
        boxSize={logoSize}
        src={logo}
        alt="LOGO"
        onClick={console.log("touch")}
      ></Image>
<Link  {...linkStyles} as={RouterLink} to="/">
                Home
              </Link>
     
          {links.map(
            (link, idx) => (
              // <Box paddingx="32px" paddingy="16px" _hover={{background: "blue"}}>
              <Link key={idx} {...linkStyles} as={RouterLink} to={link.to}>
                {link.name}
              </Link>
            )
            // </Box>
          )}
   
      <Spacer />

      {auth.isLoggedIn ? (
        <Button colorScheme="blue" onClick={(event) => logout()}>
          {auth.loading ? "Loading" : "Logout"}
        </Button>
      ) : (
        <Button
          colorScheme="blue"
          onClick={(event) => (window.location.href = "/arcana")}
        >
          {auth.loading ? "Loading" : "Login"}
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
