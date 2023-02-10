import React, { useEffect, lazy } from "react";
import { useEth } from "./context/EthContext.js";
import Web3 from "web3";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css"

const Home = lazy(() => import("./pages/Home.js"));
const Welcome = lazy(() => import("./pages/Welcome.js"))
const CreateServices = lazy(() => import("./pages/CreateServices.js"));
const Donate = lazy(() => import("./pages/Donate.js"));
const Chat = lazy(() => import("./pages/Chat.js"));
const MyServices = lazy(() => import("./pages/MyServices.js"))
const Redeem = lazy(() => import("./pages/Redeem.js"))

function App() {
  const {web3: [, setWeb3 ]} = useEth();
  const loadWeb3 = async () => {
      const h = new Web3(Web3.givenProvider || "https://rpc-mumbai.matic.today");
      setWeb3(h);
  };
  useEffect(() => {
      loadWeb3();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>}>
          <Route index element={<Welcome />} />
          <Route path="create-services" element={<CreateServices/>} />
          <Route path="donate" element={<Donate />} />
          <Route path="chat" element={<Chat />} />
          <Route path="my-services" element={<MyServices />} />
          <Route path="redeem" element={<Redeem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
