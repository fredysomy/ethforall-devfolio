import { Center} from "@chakra-ui/react"
import { Box, Button, Heading, Text } from '@chakra-ui/react';
const Welcome = () => {
    return (
    <Center height="70vh">
       <Box maxW="800px" mx="auto" mt="10">
      <Heading as="h1" size="2xl" mb="5">
        Crypto Cares
      </Heading>
      <Text mb="10">
        A DeFi + NFT protocol that allows domain experts to incentivize donation to a cause from others in exchange for a few hours of their time.
      </Text>
      <Box bg="gray.100" p="10" borderRadius="xl" mb="10">
        <Text fontWeight="bold" mb="5">
          Current focus is donation only through Sandeep Nailwal's Indian Covid Crypto Relief campaign, but we intend to scale it such that any verified fund or charity can list themselves to receive donations.
        </Text>
        <Button colorScheme="green">
          Donate Now
        </Button>
      </Box>
    </Box>
    </Center>
    )
}

export default Welcome;