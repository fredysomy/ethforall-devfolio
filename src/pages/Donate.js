import React, {useState} from "react";
import { Center, Heading, 
    Table, TableCaption, Thead, Tr, Th, Td, Tbody, 
    TableContainer, 
} 
    from "@chakra-ui/react";
import {
    Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEth } from "../context/EthContext";

const Donate = () => {
     const {account: [account] } = useEth();
     const { isOpen, onOpen, onClose } = useDisclosure();
     const [selectedRow, setSelectedRow] = useState(0);


    const tableData = [{
        donation: "10",
        serviceProvider: "ABC",
        fundName: "name1",
        validTill: "date",
        description: "The description of data 1"
    },{
        donation: "20",
        serviceProvider: "ABC",
        fundName: "name2",
        validTill: "date",
        description: "The description of data 2"
    }]
    
    const handleRowClick = (event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
        onOpen(event);
    }

return (
    <Center width="100vw" minHeight="80vh" maxWidth="100vw" flexDirection="column">
        {account ? <>
        <Heading fontSize="28px" fontWeight="bold" margin="30px" color="#252525">
            Donate
        </Heading>
    <TableContainer boxShadow="lg" padding="30px" width="80vw" minHeight="80vh" marginBottom="30px">
  <Table variant='simple'>
    <TableCaption>Donate Caption</TableCaption>
    <Thead>
      <Tr>
        <Th fontSize="16px">Service Id</Th>
        <Th fontSize="16px">Minimum Donation Amount</Th>
        <Th fontSize="16px">Service Provider</Th>
        <Th fontSize="16px">Fund Name</Th>
      </Tr>
    </Thead>
    <Tbody>
        {tableData.map((data, idx) => (
        <Tr key={idx} id={idx} cursor="pointer" onClick={handleRowClick}>
            <Td>{idx}</Td>
            <Td>{data.donation}</Td>
            <Td>{data.serviceProvider}</Td>
            <Td>{data.fundName}</Td>
        </Tr>))}
    </Tbody>
  </Table>
</TableContainer>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>


        <Stack mt='6' spacing='3'>
        <Image
        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='image'
        borderRadius='lg'
        />
        <Heading size='md'>Service Name</Heading>

        <Text>
            Valid Till: {tableData[selectedRow].validTill}
        </Text>
        <Text>
            Service Provider: {tableData[selectedRow].serviceProvider}
        </Text>
        <Text>
            Description: {tableData[selectedRow].description}
        </Text>
        <Text>
            Fund Name: {tableData[selectedRow].fundName}
        </Text>
        
        <Flex alignItems="center" gap="15px">
        <Text fontWeight="600">Amount</Text>
        <Text color='blue.600' fontSize='2xl' display="inline">
            {tableData[selectedRow].donation}
        </Text>
        </Flex>
        </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </> : <Heading>Account Not Connected</Heading>}
    </Center>
)
}

export default Donate;