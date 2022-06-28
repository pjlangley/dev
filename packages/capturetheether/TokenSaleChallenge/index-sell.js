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

  const tx = contract.methods.sell(1);

  try {
    await tx.send({
      from: signer.address,
      gas: 350000,
    })
    .once('sending', function(payload) { 
      console.log('sending...');
    })
    .once('sent', function(payload) {
      console.log('sent');
    })
    .once('transactionHash', function(txHash) { 
      console.log('Mining transaction...');
      console.log(`https://ropsten.etherscan.io/tx/${txHash}`);
     })
    .once('receipt', function(receipt) {
      console.log(`Mined in block ${receipt.blockNumber}`);
    })
    .then(function(receipt) {
        console.log(`Mined in block ${receipt.blockNumber}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
