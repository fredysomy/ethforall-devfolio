const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('CCNFT');
  const ContractFactory = await hre.ethers.getContractFactory('CC');
  const nftContract = await nftContractFactory.deploy();
  const Contract = await ContractFactory.deploy();
  await nftContract.deployed();
  console.log("NFT Contract deployed to:", nftContract.address);
  console.log("Contract deployed to:", Contract.address);
  

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