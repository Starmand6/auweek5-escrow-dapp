// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
    address public arbiter;
    address public beneficiary;
    address public depositor;

    bool public isApproved;

    event Approved(uint);
    event NewArbiter(address, address);

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "You are not the arbiter.");
        _;
    }

    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function approve() external onlyArbiter {
        uint balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        emit Approved(balance);
        isApproved = true;
    }

    function changeArbiter(address newArbiter) external onlyArbiter {
        require(
            newArbiter != address(0),
            "New owner cannot be the zero address"
        );
        address oldArbiter = arbiter;
        arbiter = newArbiter;
        emit NewArbiter(oldArbiter, newArbiter);
    }
}
