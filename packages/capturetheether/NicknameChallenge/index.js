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

  const contract = new web3.eth.Contract(abi, "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee");

  const nickname = web3.utils.asciiToHex('pjlangley');
  const paddedNickname = web3.utils.padRight(nickname, 64);

  const tx = contract.methods.setNickname(paddedNickname);

  const receipt = await tx.send({
    from: signer.address,
    gas: 350000,
  })
  .once("transactionHash", (txHash) => {
    console.log('Mining transaction...');
    console.log(`https://ropsten.etherscan.io/tx/${txHash}`)
  });

  console.log(`Mined in block ${receipt.blockNumber}`);
};

main();
