const Web3 = require('web3');
const fs = require('fs');
const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/PredictTheFutureChallenge.sol/PredictTheFutureChallenge.json"));
require('dotenv').config({ path: `${__dirname}/../../.env` });

async function main() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );

  const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(abi.abi);

  try {
    await contract.deploy({ data: abi.bytecode })
    .send({
        from: signer.address,
        gas: 700000,
    })
    .on('error', function(error){ 
      console.log('error', error);
    })
    .on('transactionHash', function(transactionHash){
      console.log('transactionHash', transactionHash);
    })
    .on('receipt', function(receipt){
      console.log(receipt.contractAddress)
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log('receipt', receipt);
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address)
    });
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });