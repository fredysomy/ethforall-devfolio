require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

module.exports = {
  defaultNetwork: "matic",
  networks: {
    // goerli: {
    //   url: process.env.QUICKNODE_API_KEY_URL,
    //   accounts: [process.env.GOERLI_PRIVATE_KEY],
    // },
    hardhat: {
    },
    matic: {
      url: "https://tame-long-sun.matic-testnet.discover.quiknode.pro/160b71b8928537dee9f04f0fb1bd74bf4a2b74d9/",
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    // Your API key for Etherscan
    apiKey: {
      goerli: process.env.ETHERSCAN_APIKEY,
      polygonMumbai: process.env.MUMBAI_APIKEY
    },
  },
};
