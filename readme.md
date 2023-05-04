# Alchemy University Eth Dev Bootcamp Week 5 Project - Decentralized Escrow Application

Week 4 focused on smart contracts and Hardhat.

## Functionality and Features Added to the Project

-   Added conversion from wei to ether in App.js, so that users do not have to enter the deposit amount in Wei.
-   Added a Previous Approved Contracts Lookup section so users can search old approved contracts by address. This functionality only works if the page is not refreshed.
-   Added an onlyArbiter modifier and refactored the approve() function.
-   Added a `changeArbiter()` function that lets the arbiter give contract approval rights to another person or entity. This functionality is only in the Escrow.sol as of now.
-   Added a new Event to emit when `changeArbiter()` is successfully executed.
-   Added tests to make sure onlyArbiter modifer and `changeArbiter()` functions are working properly. All passing. (Had to hardcode in some addresses due to ethers getSigners() returning an object without an address.)

## Learnings

-   Learned what the React.StrictMode wrapper does and is: for catching errors/bugs in development. To be removed in production.
-   You can pass a function into a Javascript object's key-value pair and shuttle that around a React app.... Mind. Blown.

# Original Decentralized Escrow Application Project Instructions from Alchemy

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
