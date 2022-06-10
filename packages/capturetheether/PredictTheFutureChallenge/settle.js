const Web3 = require('web3');
const fs = require('fs');
const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/PredictTheFutureChallenge.sol/PredictTheFutureChallenge.json"));
require('dotenv').config({ path: `${__dirname}/../.env` });

async function main() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );

  const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(abi.abi, "0x532dE032d88fF06fD65a638b99932798fE71FfC3");

  const tx = contract.methods.settle();

  try {
    await tx.send({
      from: signer.address,
      gas: 300000,
      // value: web3.utils.toWei("1", 'ether'),
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
