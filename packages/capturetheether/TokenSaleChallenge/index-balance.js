const Web3 = require('web3');
const fs = require('fs');
const abi = JSON.parse(fs.readFileSync("./abi.json"));
require('dotenv').config({ path: `${__dirname}/../.env` });

async function main() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );

  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );

  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(abi, "0x9E069e011b5284136FF9Dd07b1cdDc5e6011dF23");

  await contract.methods.balanceOf("0xc3df4Ca4D28e7EAE42F4d8adD5b99e046476207D").call({ from: signer.address }, function (error, result) {
    if (error) {
      console.log('error', error);
    }

    console.log('balance', result);
    // balance 115792089237316195423570985008687907853269984665640564039458
    // :D
  });
};

main();
