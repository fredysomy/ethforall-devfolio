import React, {Suspense} from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import { EthProvider } from "./context/EthContext";
import { ChakraProvider, CircularProgress } from "@chakra-ui/react";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <Suspense fallback={<CircularProgress />}>
      <EthProvider>
          <App />
      </EthProvider>
    </Suspense>
  </ChakraProvider>
);

