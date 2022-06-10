//SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.0;
pragma solidity ^0.4.22;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    bytes32 answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;
    
    // GuessTheSecretNumberChallenge
    function guess() public view returns(uint8) {
        for (uint8 i=0; i<256; i++) {
            if (keccak256(abi.encodePacked(i)) == answerHash) {
                return i;
            }
        }
        return 0;
    }

    function getBlocknumber() public view returns(uint) {
        return block.number;
    }

    function getBlockHash() public view returns(bytes32) {
        return blockhash(12342975);
        // return blockhash(block.number);
    }

    function getBlockTimestamp() public view returns(uint) {
        return block.timestamp;
    }

    //GuessTheRandomNumberChallenge
    function getHashed() public view returns(uint8) {

        // worked! needed the `abi.encode` call for some reason...
        return uint8(keccak256(abi.encode(0x51ed0d74857564c3521b433b47f54dd0ba11d3fcac4949d5b9ff0b278666d0ab, 1654616842)));

        // wrong:
        // return uint8(keccak256(0x1b5ee906a805c502e38e30756375253e36d4b0088bb92e1edc9a5c5640dfafcf, 1654616842));
        // wrong:
        // return uint8(keccak256(block.blockhash(12342976 - 1), 1654616842));
        // wrong:
        // uint8(keccak256(block.blockhash(block.number - 1), now));
    }

    //GuessTheNewNumberChallenge
    function getHashedOnDemand() public view returns(uint8) {
        return uint8(keccak256(abi.encode(0xc77a0ecdd2af45ab757a4ead40ddf9aca9583ef611c30f17c944e023bcade564, 1654773265)));
        // return uint8(keccak256(abi.encode(0x33cccc681e1b00ad6392cfeb70c262b63a2a8222ce46810c2cdf220a4a26df64, 1654772401)));
    }
}
