const main = async () => {
    
    const nftContractFactory = await hre.ethers.getContractFactory('CCNFT');
    const ContractFactory = await hre.ethers.getContractFactory('CC');
    const nftContract = await nftContractFactory.deploy();
    const Contract = await ContractFactory.deploy();
    await nftContract.deployed();
    console.log("NFT Contract deployed to:", nftContract.address);
    console.log("Contract deployed to:", Contract.address);


     // Call the function.
  let txn = await Contract.registerNewR(
    "0",
    "0x42456E6C6823bDA6E2C30B6b11c08F172D7940A8",
    "TEST"
  )
  await txn.wait()

  txn = await Contract.registerNewService(
    "0x127F2206E48F024f1Bdbc764B188E9a53a39e6e9",
    "500",
    "100000000",
    "HUI",
    "0x42456E6C6823bDA6E2C30B6b11c08F172D7940A8",
    "TEST555"

  )
  await txn.wait()
  txn = await Contract.donateToService(
    "0"
  )
  await txn.wait()
  txn = await nftContract.makeAnEpicNFT(
    "0x0B523cA2EeA9E2287626Dd7b1246E14A68555e41",
    "400",
    "VItalik",
    "NGO 123",
    "vitalik.lens"
  )
  // Wait for it to be mined.
  await txn.wait()

  // Mint another NFT for fun.
  txn = await nftContract.makeAnEpicNFT(
    "0x0B523cA2EeA9E2287626Dd7b1246E14A68555e41",
    "50",
    "John",
    "NGO 1",
    "John.lens"
  )
  // Wait for it to be mined.
  await txn.wait()

  // for(let i=2; i<10; i++){
  //   // Mint another NFT for fun.
  // txn = await nftContract.makeAnEpicNFT()
  // // Wait for it to be mined.
  // await txn.wait();
  // }

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();