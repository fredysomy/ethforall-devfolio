import React, { useEffect, useState, useContext } from 'react';
import { Box, Container, Flex, Button, Spacer, Modal} from "@chakra-ui/react";
import { HuddleIframe } from "@huddle01/huddle01-iframe";
import { Chat } from "@pushprotocol/uiweb";
import { useEth } from "../context/EthContext";



const Chatbox = () => {
    const [serviceAddress, setServiceAddress] = useState("0x0");
    const {account: [account], web3: [web3]} = useEth();

    const messages = [{
        msg: "0x0B523cA2EeA9E2287626Dd7b1246E14A68555e41",
        info: "Service: 1-on-1 call",
    },{
        msg: "0x6144737779A6B63452BE6Bca1A8aAd9A64674E0B",
        info: "2 hours of Biz Dev",
    },{
        msg: "0x127F2206E48F024f1Bdbc764B188E9a53a39e6e9",
        info: "Degen Talks",
    }]
    
    return (<Container width="100vw" maxWidth="98vw" minHeight="80vh" boxShadow="md">
    <Box>
        <Flex>
            <Box width="75%" padding="8px">
                {messages.map(data => 
                    <Box 
                        width="100%" 
                        height="80px" 
                        padding="8px" 
                        marginBottom="16px" 
                        border="1px" 
                        borderRadius="md"
                        bg="#f1f1f1"
                        // onClick={(e) => setServiceAddress(data.msg)}
                        >
                        {data.msg}
                        <Spacer/>
                        <Button bottom="18px" left="92%" padding="25px" colorScheme="blue" onClick={(e) => setServiceAddress(data.msg)}>Chat</Button>;
                        <Chat
   account={account} //user address
   supportAddress={serviceAddress} //support address
   apiKey="9uYRhy0hol.fDp4IHD7auZOFpNDDtz2Ql4i2W9RYj2tpA9TLWyuX4AmVIC3Ge9MtyAHJAWOB6je"
    env="staging"
 />
                    </Box>
                )}
            </Box>
            <Box height="80vh" bg="grey" width="25%">
            </Box>
        </Flex>
    </Box>
    </Container>)
}

export default Chatbox;