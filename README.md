# ethforall-devfolio
# CryptoCares

A DeFi + NFT protocol that allows domain experts to incentivize donation to a cause from others in exchange for a few hours of their time.
CryptoCares is a social good decentralized application that connects people who wants to provide charitable services to another party. It can be defined as a trade of time of a person for a donation to a good cause. People like social influencers and domain experts can choose to use their reach and expertise for the public good. Influencers or Domain Experts (SERVICE PROVIDERS) may create SERVICES to incentivize donations. Donators who donate to these SERVICES receive a Proof Of Donation NFT to redeem their service. Using Social rep and public goods Crypto Cares aims to transform how donations are done. Social tokens for a cause. CryptoCares.

## Tracks Applying for: 
- Mantle (Best Public Goods, Best NFT Project)
- Arcana (Best Auth Implementation, Prize Pool)
- Filecoin FVM (Top 3 Hacks, Prize Pool)
- Polygon (Open Track)
- Quicknode (Use of Quicknode RPC)

## NOTE: This project is an extension from ETHINDIA'22 
### Differences and major changes
- contract/contracts/CC.sol => added functions for staking by service providers, withdrawing stake, re-enabling a service, and disabling a service. This also saw the reduction of unecessary structs and better mapping structures to try and optimize the code and lookup.
- Integration of Arcana Auth SDK in order to better optimize UX. A user now can use social auth to login to their wallet as well as on testnet they can use the Faucet we created to mint USDC (ERC20) to test out the dApp.
- Integration of contracts with frontend using web3.js, enriching user flow and attempting to create a fully funcitonal frontend for the dApp.
- Deploy CC_Flattened.sol (inheriting CCNFT.sol) and USDC.sol to Mantle, Polygon, and FVM, to increase diversity of choice and better experience for users.

## Video Overview
Project Explainer: https://www.youtube.com/watch?v=rW3hREKgHHI
ETHFORALL Working Demo: https://youtu.be/PCIhLlDYxpM

## CryptoCares
https://www.canva.com/design/DAEfNk7WQek/P2AenUmx4lYFgwgitwhuCA/edit?utm_content=DAEfNk7WQek&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Deployed Contracts Addresses

Mantle
CC.sol - 0x44b32A9059aF53e5a63f2445B31bd0a23f00b2BF (https://explorer.testnet.mantle.xyz/address/0x44b32A9059aF53e5a63f2445B31bd0a23f00b2BF)
USDC.sol - 0x39C4a5C9f611118d2294EE18B5a26cfaEF0eb8c8 (https://explorer.testnet.mantle.xyz/address/0x39C4a5C9f611118d2294EE18B5a26cfaEF0eb8c8)

Filecoin FVM
CC.sol-  0x44b32A9059aF53e5a63f2445B31bd0a23f00b2BF  (https://hyperspace.filfox.info/en/address/0x44b32A9059aF53e5a63f2445B31bd0a23f00b2BF)
USDC.sol - 0x39C4a5C9f611118d2294EE18B5a26cfaEF0eb8c8 (https://hyperspace.filfox.info/en/address/0x39C4a5C9f611118d2294EE18B5a26cfaEF0eb8c8)

Polygon:
CC.sol - 0x6C59Bc0BfE6C5d9D12b221E6f25fE9129b42bFC3 (https://mumbai.polygonscan.com/address/0x6c59bc0bfe6c5d9d12b221e6f25fe9129b42bfc3)
USDC.sol - 0x64c61eFac6383d0F8A4cff6aDE93c474ece7AD44 (https://mumbai.polygonscan.com/address/0x64c61eFac6383d0F8A4cff6aDE93c474ece7AD44)



# To run:

## Clone
https://github.com/fredysomy/ethforall-devfolio.git

## Install Dependancies
```
run 'npm install' or 'npm install --force'
```
## Run Project
```
run 'npm start' 
```
