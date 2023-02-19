import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EthProvider } from "./context/EthContext";
import { ChakraProvider, CircularProgress } from "@chakra-ui/react";
import theme from "./theme";
import { AuthProvider} from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
const appAddress = "03cf55992aeb8f2785ae25202f4d5ac988980a35";
const provider = new AuthProvider(`${appAddress}`); // required
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
