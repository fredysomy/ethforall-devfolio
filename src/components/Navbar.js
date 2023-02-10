import React, { useState } from "react";
import { Link, Button, Flex, Spacer, Image } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom" 
import logo from "../assets/logo.png"
import { useEth } from "../context/EthContext";


const Navbar = () => {
    const logoSize = "35px";

    const links = [
        {name: "Donate", to: "donate"},
        {name: "Create Services", to: "create-services"},
        {name: "My Services", to: "my-services"},
        {name: "Redeem", to: "redeem"},
        {name: "Chat", to: "chat"}
    ]

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
    }

    const {account: [account, setAccount]} = useEth();
    const setChainId = useState(null)[1]

        const onClickConnect = async (event) => {
        try {
            if (window.ethereum) {
                event.preventDefault();
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const chainId = await window.ethereum.request({
                    method: "eth_chainId",
                });
                setChainId(chainId);

                await setAccount(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onClickDisconnect = async (event) => {
        try {
            event.preventDefault();
            await setAccount(null);
        } catch (error) {
            console.error(error);
        }
    };



    return (
    <Flex 
        paddingY="16px" paddingX="16px" gap="30px" borderBottomColor="black" bg="white"
        marginBottom="30px" 
        boxShadow="lg" position="sticky"
    >
        <Image boxSize={logoSize} src={logo} alt="LOGO" />

        {links.map((link, idx) => 
            // <Box paddingx="32px" paddingy="16px" _hover={{background: "blue"}}>
                <Link
                key={idx}
                {...linkStyles}
                as={RouterLink} 
                to={link.to} 
                >{link.name}</Link>
            // </Box>
        )}
        <Spacer />
        {/* <Link {...linkStyles} as={RouterLink} to="/connect">Connect</Link> */}
        {account === null ? 
        <Button colorScheme="blue" onClick={onClickConnect}>Connect</Button> :
        <Button colorScheme="blue" onClick={onClickDisconnect}>{`Disconnect ${account}`}</Button>
        }
    </Flex>
    )
}

export default Navbar;