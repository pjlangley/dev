const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    // const result = await greeter.guess();

    // console.log('result', result);

    // expect(result).to.equal(170);

    // const blocknumber = await greeter.getBlocknumber();
    // console.log('getBlocknumber', blocknumber);
    // const blockhash = await greeter.getBlockHash();
    // console.log('blockhash', blockhash);
    // const blocktimestamp = await greeter.getBlockTimestamp();
    // console.log('blocktimestamp', blocktimestamp);
    // const hashed = await greeter.getHashed();
    // console.log('hashed', hashed);

    const hashed = await greeter.getHashedOnDemand();
    console.log('hashed', hashed);



    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
