import React, {useState} from "react";
import { Box, Center, Select, Input, Heading, Flex, Button } from "@chakra-ui/react";
import { useEth } from "../context/EthContext";
import ABI from "../contracts/newABI.json";

const CreateServices = () => {
    const {account: [account], web3: [web3]} = useEth();
    const [data, setData] = useState({
    minDonation: "",
    duration: "",
    amount: "",
    description: "",
    donateAmount: "",
    uri: "",
    unit: "",
  });

     const handleInputChange = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };


  var contract = web3 && new web3.eth.Contract(
    ABI,
    "0x7E0cDC2A2C793F15BC15A9df835A14c50FfFD831"
  );

  const handleSubmit = async (event) => {
    let {
      minDonation,
      duration,
      amount,
      description,
      donateAmount,
      uri,
      unit,
    } = data;
    event.preventDefault();
    console.log("minimum donation amount: " + minDonation);
    console.log(ABI[5]);
    console.log(contract.methods);
    console.log(donateAmount);
    console.log(unit);
    contract.methods
      .Add_Services(minDonation, duration, amount, description, uri)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        alert("Service has been created");
      });
  }; 

    return (
    <Center width="100vw" minHeight="80vh">
        {account ? <>
        <Center borderRadius="xl" flexDirection="column" width="800px" padding="30px" boxShadow="md">
            <Heading size="lg" marginBottom="30px">Create Services</Heading>
            <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                    Minimum Donation Amount
                </Heading>
                <Input 
                    placeholder="Minimum Donation Amount" 
                    name="minDonation"
                    value={data.minDonation} 
                    onChange={handleInputChange}
                />
            </Box>
            <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                    Duration of Service
                </Heading>
                <Input
                    name="duration" 
                    placeholder="Duration Of Service" 
                    value={data.duration} 
                    onChange={handleInputChange} />
            </Box>
            <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                    Amount of Service
                </Heading>
                <Flex gap="16px">
                    <Input 
                        placeholder="Amount of Service" 
                        name="amount"
                        value={data.amount} 
                        onChange={handleInputChange} />
                    <Select 
                    placeholder="Unit" 
                    width="25%"
                    name="unit" 
                    value={data.unit} 
                    onChange={handleInputChange}>
                        <option>Matic</option>
                    </Select>
                </Flex>
            </Box>
            <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                    Description
                    <Input 
                    placeholder="Description" 
                    name="description"
                    value={data.description} 
                    onChange={handleInputChange} />
                </Heading>
            </Box>
            <Box width="80%" marginBottom="16px">
                <Heading fontSize="18px" fontWeight="600" marginBottom="8px">
                    Contact URI
                </Heading>
                <Input 
                    placeholder="Contact URI" 
                    name="uri"
                    value={data.uri} 
                    onChange={handleInputChange} />
            </Box>
            <Button colorScheme="blue" marginTop="30px" width="80%" onClick={handleSubmit}>
                CREATE SERVICE
            </Button>
        </Center>
        </> : <Heading>Account Not Connected</Heading>}
    </Center>
    )
}

export default CreateServices;