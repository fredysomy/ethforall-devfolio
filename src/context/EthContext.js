import React, { useState, useContext } from "react";

const EthContext = React.createContext();
// const EthUpdateContext = React.createContext();

export const useEth = () => {
    return useContext(EthContext);
}

export function EthProvider({children}) {
    // const [eth, setEth] = useState({
    //     account: null,
    //     web3: null,
    //     contract: null
    // });

    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    return (
    <EthContext.Provider 
        value={{
            account: [account, setAccount],
            web3: [web3, setWeb3],
            contract: [contract, setContract]
        }}>
        {/* <EthUpdateContext value={setEth}> */}
            {children}
        {/* </EthUpdateContext> */}
    </EthContext.Provider>)
}