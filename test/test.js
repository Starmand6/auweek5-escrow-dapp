const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Escrow", function () {
    let contract;
    let depositor;
    let beneficiary;
    let arbiter;
    let newArbiter;
    let newArbiterAddress;
    const deposit = ethers.utils.parseEther("1");
    beforeEach(async () => {
        depositor = ethers.provider.getSigner(0);
        beneficiary = ethers.provider.getSigner(1);
        arbiter = ethers.provider.getSigner(2);
        newArbiter = ethers.provider.getSigner(3);
        newArbiterAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
        const Escrow = await ethers.getContractFactory("Escrow");
        contract = await Escrow.deploy(
            arbiter.getAddress(),
            beneficiary.getAddress(),
            {
                value: deposit,
            }
        );
        await contract.deployed();
    });

    it("should be funded initially", async function () {
        let balance = await ethers.provider.getBalance(contract.address);
        expect(balance).to.eq(deposit);
    });

    describe("after approval from address other than the arbiter", () => {
        it("should revert", async () => {
            await expect(contract.connect(beneficiary).approve()).to.be
                .reverted;
        });
    });

    describe("after approval from the arbiter", () => {
        it("should transfer balance to beneficiary", async () => {
            const before = await ethers.provider.getBalance(
                beneficiary.getAddress()
            );
            const approveTxn = await contract.connect(arbiter).approve();
            await approveTxn.wait();
            const after = await ethers.provider.getBalance(
                beneficiary.getAddress()
            );
            expect(after.sub(before)).to.eq(deposit);
        });
    });

    describe("after transferring arbiter rights", () => {
        it("should allow new arbiter to approve", async () => {
            await contract.connect(arbiter).changeArbiter(newArbiterAddress);
            await expect(contract.connect(newArbiter).approve()).to.not.be
                .reverted;
        });
        it("should revert when old arbiter tries to approve", async () => {
            await contract.connect(arbiter).changeArbiter(newArbiterAddress);
            await expect(contract.connect(arbiter).approve()).to.be.reverted;
        });
        it("should emit a NewArbiter event", async () => {
            // Had to hardcode in address due to ethers getSigners() returning
            // an object without an address.
            await expect(
                contract.connect(arbiter).changeArbiter(newArbiterAddress)
            )
                .to.emit(contract, "NewArbiter")
                .withArgs(
                    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                    newArbiterAddress
                );
        });
    });
});
