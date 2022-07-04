const { expect, use } = require("chai");
const { ethers } = require("hardhat");

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

describe("Staking", function() {
    let stakingContract;
    let nftContract;
    let tokenContract;
    let nftContractAddress;
    let tokenContractAddress;
    let stakingContractAddress;
    let owner;
    let user; 

    before(async function() {
        const stakingFactory = await ethers.getContractFactory("Staking");
        const nftFactory = await ethers.getContractFactory("VictorGalleryAuction");
        const tokenFactory = await ethers.getContractFactory("GalleryToken");
        tokenContract = await tokenFactory.deploy();
        nftContract = await nftFactory.deploy();
        nftContractAddress = nftContract.address;
        tokenContractAddress = tokenContract.address;
        stakingContract = await stakingFactory.deploy(nftContractAddress, tokenContractAddress);
        stakingContractAddress = stakingContract.address;

        const accounts = await ethers.getSigners();
        owner = accounts[0];
        user = accounts[1];

        const nftContractWithUser = nftContract.connect(user);
        const nftContractWithOwner = nftContract.connect(owner);
        const tokenWithOwner = tokenContract.connect(owner);
        await nftContractWithUser.fastMint();
        await nftContractWithUser.fastMint();
        await nftContractWithUser.fastMint();
        await nftContractWithUser.fastMint();
        await nftContractWithUser.fastMint();
        await tokenWithOwner.approve(stakingContractAddress, 1000000000000);
        await nftContractWithUser.setApprovalForAll(stakingContractAddress, true);
    })
    it("User stakes NFT", async function () {
        const stakingWithUser = stakingContract.connect(user);
        await stakingWithUser.stake(0);
        await stakingWithUser.stake(1);
        await stakingWithUser.stake(2);
        await stakingWithUser.stake(3);
        await stakingWithUser.stake(4);
        expect(( await stakingWithUser.totalStaked()).toString()).to.equal(
            "5"
        );
    })
    it("Unstakes NFT", async function () {
        const stakingWithUser = stakingContract.connect(user);
        const userAddress = user.getAddress();
        await stakingWithUser.unstakeNFT(userAddress, [0, 1])
        expect(( await stakingWithUser.totalStaked()).toString()).to.equal(
            "3"
        );
    });
    it("Claims his shit", async function () {
        const stakingWithUser = stakingContract.connect(user);
        const tokenWithUser = tokenContract.connect(user);
        const userAddress = user.getAddress();
        await delay(5000);
        await stakingWithUser.claim([0, 1], true);
        expect(( await stakingWithUser.getFromUnstaked(userAddress)).toString()).to.equal(
            "3"
        );
    });

})