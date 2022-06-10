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

  const contract = new web3.eth.Contract(abi, "0x0Ecdf0Cd16206C2d86CaD53cF3D6dBedE6a04A11");

  const block = await web3.eth.getBlock("pending");

  // block.number could be `null`:
  if (!block.number) {
    return;
  }

  console.log("PENDING:block.number", block.number);
  console.log("PENDING:block.timestamp", block.timestamp);
  console.log("LATEST:block.hash", block.parentHash);

  console.log(
    "encoded (verify it matches Solidity output):",
    web3.utils.soliditySha3(block.parentHash, block.timestamp)
  );
  const hash = web3.utils.soliditySha3(block.parentHash, block.timestamp);
  const number = web3.eth.abi.decodeParameter('uint8', hash);
  console.log('number to guess:', number);

  const tx = contract.methods.guess(number);

  try {
    await tx.send({
      from: signer.address,
      gas: 45000,
      value: web3.utils.toWei("1", 'ether'),
    })
    .once('sending', function(payload){ 
      console.log('sending...')
    })
    .once('sent', function(payload){
      console.log('sent')
    })
    .once('transactionHash', function(txHash){ 
      console.log('Mining transaction...');
      console.log(`https://ropsten.etherscan.io/tx/${txHash}`) 
     })
    .once('receipt', function(receipt){
      console.log(`Mined in block ${receipt.blockNumber}`);
    })
    .then(function(receipt){
        console.log(`Mined in block ${receipt.blockNumber}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
