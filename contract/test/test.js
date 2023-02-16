pragma solidity >=0.8.1;

import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";

describe("CC contract", function () {
  let ccContract: Contract;
  let usdcToken: Contract;

  before(async () => {
    const CC = await ethers.getContractFactory("CC");
    ccContract = await CC.deploy();
    await ccContract.deployed();

    const USDCToken = await ethers.getContractFactory("USDCToken");
    usdcToken = await USDCToken.deploy();
    await usdcToken.deployed();
  });

  it("should register a new service", async function () {
    const provider = ethers.utils.getAddress("0x123");
    const amount = ethers.utils.parseUnits("100", 6);
    const duration = 3600;
    const maxNumberOfTickets = 10;
    const description = "A test service";
    const recvaddress = ethers.utils.getAddress("0x456");
    const serviceName = "Test Service";
    await ccContract.registerNewService(provider, amount, duration, maxNumberOfTickets, description, recvaddress, serviceName);

    const service = await ccContract.services(0);
    expect(service.provider).to.equal(provider);
    expect(service.amount).to.equal(amount);
    expect(service.startTime).to.be.closeTo(await ethers.provider.getBlock("latest").timestamp, 5);
    expect(service.endTime).to.be.closeTo(service.startTime + duration, 5);
    expect(service.duration).to.equal(duration);
    expect(service.maxNumberOfTickets).to.equal(maxNumberOfTickets);
    expect(service.description).to.equal(description);
    expect(service.recvaddress).to.equal(recvaddress);
    expect(service.serviceName).to.equal(serviceName);
  });

  it("should deposit a stake", async function () {
    const amount = ethers.utils.parseUnits("25", 6);
    const serviceID = 0;
    const provider = await ccContract.services(serviceID).provider;
    const balanceBefore = await usdcToken.balanceOf(ccContract.address);
    await usdcToken.approve(ccContract.address, amount);
    await ccContract._depositStake(amount, provider, serviceID);
    const balanceAfter = await usdcToken.balanceOf(ccContract.address);
    expect(balanceAfter).to.equal(balanceBefore.add(amount));
    expect(await ccContract.stakes(serviceID)).to.deep.equal({ provider, amount });
  });

  it("should withdraw a stake", async function () {
    const serviceID = 0;
    const amount = await ccContract.stakes(serviceID).amount;
    const balanceBefore = await usdcToken.balanceOf(ccContract.address);
    await ccContract._withdrawStake(serviceID);
    const balanceAfter = await usdcToken.balanceOf(ccContract.address);
    expect(balanceAfter).to.equal(balanceBefore.sub(amount));
    expect(await ccContract.stakes(serviceID)).to.deep.equal({ provider: ethers.constants.AddressZero, amount: 0 });
  });

  it("should re-enable a service", async function () {
    const serviceID = 0;
    await ccContract._reEnableService(serviceID);
    expect(await ccContract.serviceEnabled(serviceID)).to.be.true;
  });
});