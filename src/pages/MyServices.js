import React from "react";
import { Heading, Center, Button } from "@chakra-ui/react";
import { useEth } from "../context/EthContext";
import { useAuth } from "@arcana/auth-react";
import ABI from "../contracts/CC.json";
const MyServices = () => {
  const auth = useAuth();
  const account =
    auth.loading === true
      ? auth.isLoggedIn === true
        ? auth.user.address
        : null
      : null;
  const {
    web3: [web3],
  } = useEth();
  var contract =
    web3 &&
    new web3.eth.Contract(ABI, "0x6C59Bc0BfE6C5d9D12b221E6f25fE9129b42bFC3");

  const getAll = () => {
    contract.methods
      .getServicesDonatedByUser()
      .send({
        from: auth.user.address,
        gas: 1500000,
        gasPrice: "30000000000000",
      })
      .then((data) => {
        console.log(data);
      });
  };
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
              <Heading>
                <Button onClick={getAll}>Get</Button>
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

export default MyServices;
