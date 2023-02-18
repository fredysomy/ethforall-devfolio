import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EthProvider } from "./context/EthContext";
import { ChakraProvider, CircularProgress } from "@chakra-ui/react";
import theme from "./theme";
import { AuthProvider ,CHAIN} from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
const appAddress = "03cf55992aeb8f2785ae25202f4d5ac988980a35";
const provider = new AuthProvider(`${appAddress}`,{
network: 'testnet', //defaults to 'testnet'
position: 'left', //defaults to right
theme: 'light', //defaults to dark
alwaysVisible: false, //defaults to true which is Full UI mode
chainConfig: {
  chainId: CHAIN.POLYGON_MAINNET, //defaults to CHAIN.ETHEREUM_MAINNET
  rpcUrl: 'https://polygon-rpc.com', //defaults to 'https://rpc.ankr.com/eth'
},
}); // required
try {
  await provider.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '5001',
      chainName: 'Mantle',
      rpcUrls: ['https://rpc.testnet.mantle.xyz/']
    }]
  })
} catch(error) {
  console.log(error)
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <Suspense fallback={<CircularProgress />}>
      <ProvideAuth provider={provider}>
        <EthProvider>
          <App />
        </EthProvider>
      </ProvideAuth>
    </Suspense>
  </ChakraProvider>
);
