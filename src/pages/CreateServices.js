import React, { useState } from "react";
import {
  Box,
  Center,
  Select,
  Input,
  Heading,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'
import { useEth } from "../context/EthContext";
import ABI from "../contracts/CC.json";
import NewABI from "../contracts/USDC.json";
import { useAuth } from "@arcana/auth-react";

const CreateServices = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [approved,setApproved]=useState(false);
  let recAdress="0x3e50874CdAb58B6fAf539da09B6966a1BE597D5C";
  const [load,setLoading]=useState(false);
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

  const [data, setData] = useState({
    minDonation: "",
    duration: "",
    amount: "",
    description: "",
    donateAmount: "",
    unit: "",
    tickets:"",
    name:""
  });
  
  const handleInputChange = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  var contract =
    web3 &&
    new web3.eth.Contract(ABI, "0x6C59Bc0BfE6C5d9D12b221E6f25fE9129b42bFC3",{gasPrice:20000000000});
  var USDCContract= web3 && new web3.eth.Contract(NewABI,"0x64c61eFac6383d0F8A4cff6aDE93c474ece7AD44")
  const handleSubmit = async (event) => {
    let {
      minDonation,
      duration,
      amount,
      description,
      donateAmount,
      unit,
      tickets,name
    } = data;
    event.preventDefault();
    console.log("minimum donation amount: " + minDonation);
    console.log(ABI[5]);
    console.log(contract.methods);
    console.log(donateAmount);
    console.log(unit);
    contract.methods
      .registerNewService(amount,duration,tickets,description,recAdress,name)
      .send({ from: auth.user.address })
      .on("transactionHash", (hash) => {
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        alert("Service has been created");
      });
  };
  const approveUSDC=()=>{
   setLoading(true);
    USDCContract.methods.approve(auth.user.address,data.amount).call().then((data)=>{
      console.log(data)
    }).then(()=>{
      setApproved(true)
      setLoading(false)
    })
  }

  return (
    <Center width="100vw" minHeight="80vh">
      {auth.loading ? (
        <Heading>Loading</Heading>
      ) : (
        <>
          {auth.isLoggedIn ? (
            <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Stake</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                You need to stake 25% of the Donation amount
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose && handleSubmit}>
                  Stake
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
            <Center
              borderRadius="xl"
              flexDirection="column"
              width="800px"
              padding="30px"
              boxShadow="md"
            >
              <Heading size="lg" marginBottom="30px">
                Create Services
              </Heading>
              <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                 Service Name
                  <Input
                    placeholder="Service name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </Heading>
              </Box>
              
              <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                  Duration of Service
                </Heading>
                <Input
                  name="duration"
                  placeholder="Duration Of Service"
                  type="number"
                  value={data.duration}
                  onChange={handleInputChange}
                />
              </Box>
              <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                  Amount of Service
                </Heading>
                <Flex gap="16px">
                  <Input
                    placeholder="Amount of Service"
                    name="amount"
                    type="number"
                    value={data.amount}
                    onChange={handleInputChange}
                  />
                  <Select
                    placeholder="Unit"
                    width="25%"
                    name="unit"
                    value={data.unit}
                    onChange={handleInputChange}
                  >
                    <option>Matic</option>
                  </Select>
                </Flex>
              </Box>
              <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                  Number of Tickets
                  <Input
                    placeholder="Tickets"
                    name="tickets"
                    type="text"
                    value={data.tickets}
                    onChange={handleInputChange}
                  />
                </Heading>
              </Box>
              <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                  Description
                  <Input
                    placeholder="Description"
                    name="description"
                    type="text"
                    value={data.description}
                    onChange={handleInputChange}
                  />
                </Heading>
              </Box>
              {
                approved ? <>
                  <Button
                colorScheme="blue"
                marginTop="30px"
                width="80%"
                onClick={onOpen}
              >
                CREATE SERVICE
               
              </Button>
                </>
              :
              <>
                 <Button
                colorScheme="blue"
                marginTop="30px"
                width="80%"
                onClick={approveUSDC}
              >
                Approve {load ? <><Spinner></Spinner></>:<></>}
              </Button>
              </>
              }
              
            </Center>
            </>
          ) : (
            <Heading>Not loggedn in</Heading>
          )}
        </>
      )}
    </Center>
  );
};

export default CreateServices;
