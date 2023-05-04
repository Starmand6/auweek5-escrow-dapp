require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;

module.exports = {
    solidity: "0.8.17",
    paths: {
        artifacts: "./app/src/artifacts",
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        // localhost: {
        //     url: "http://127.0.0.1:8454/",
        //     chainId: 31337,
        //     blockNumber: 8259000,
        // },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: { PRIVATE_KEY },
            chainId: 5,
            blockConfirmations: 6,
        },
    },
};
