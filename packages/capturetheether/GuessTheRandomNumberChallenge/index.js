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

  const contract = new web3.eth.Contract(abi, "0xD23c7102f9cc50F20d6a35Cb0327D45bC357577a");

  const tx = contract.methods.guess(174); // yay
  // 160 wrong
  // 170 wrong
  // 177 wrong
  // 62 wrong
  // 125 wrong
  // 254 wrong

  // const block = await web3.eth.getBlock(12342975)
  // console.log(block)

  try {
    await tx.send({
      from: signer.address,
      gas: 42000,
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
