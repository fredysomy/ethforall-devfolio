import React from "react";
import { Heading, Center, Button } from "@chakra-ui/react";
import { useEth } from "../context/EthContext";
import { useAuth } from "@arcana/auth-react";
import ABI from "../contracts/CC.json";
import NewABI from "../contracts/USDC.json";
const Faucet = () => {
  const auth = useAuth();
  const {
    web3: [web3],
  } = useEth();

  const account =
    auth.loading === true
      ? auth.isLoggedIn === true
        ? auth.user.address
        : null
      : null;

      var USDCContract =
      web3 &&
      new web3.eth.Contract(NewABI, "0x64c61eFac6383d0F8A4cff6aDE93c474ece7AD44");
      const mintUSD=()=>{
        USDCContract.methods.mint10000(auth.user.address).send({
          from: auth.user.address,
          gas: 1500000,
          gasPrice: "30000000000000",
        }).then((data)=>{
          console.log(data)
        })
      }
  return (
    <Center>
      {auth.loading ? (
        <>
          <Heading>Loading</Heading>
        </>
      ) : (
        <>
          {auth.isLoggedIn ? (
            <>
              <Heading>

                <Button onClick={mintUSD}>Mint USDC</Button>
              </Heading>
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

export default Faucet;
