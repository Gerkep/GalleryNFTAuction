// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("VictorGallery Auction", function () {
//   let owner;
//   let addr1;
//   let auctionContract;

//   before(async function () {
//     const auctionFactory = await ethers.getContractFactory("VictorGalleryAuction");
//     auctionContract = await auctionFactory.deploy();
    
//     const accounts = await ethers.getSigners();
//     owner = accounts[0];
//     addr1 = accounts[1];
//   });

//     it("Makes sure only owner can start auction", async function () {
//         const aucitonWithUser = auctionContract.connect(addr1);
//         let err = '';
//         try{
//             await aucitonWithUser.start(1655129913, 200);
//         }catch (e) {
//             err = e.message;
//         }
//         expect(err).to.equal(
//           "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
//       );
//     });
//   it("Starts auction", async function () {
//       const aucitonWithOwner = auctionContract.connect(owner);
//       await aucitonWithOwner.start(1655127913, 200);
//       expect(( await aucitonWithOwner.paused()).toString()).to.equal(
//         "false"
//     );
//   });
//   it("Blocks from starting second auction", async function () {
//     const aucitonWithOwner = auctionContract.connect(owner);
//     let err = '';
//     try{
//         await aucitonWithOwner.start(1655129913, 200);
//     }catch (e) {
//         err = e.message;
//     }
//     expect(err).to.equal(
//       "VM Exception while processing transaction: reverted with reason string 'Already running'"
//     );
//     });
//     it("Owner can pause auction", async function () {
//         const aucitonWithOwner = auctionContract.connect(owner);
//         const auctionWithUser = auctionContract.connect(addr1);
//         await aucitonWithOwner.setPause(true);
//         let err = '';
//         try{
//             await auctionWithUser.bid({ value: ethers.utils.parseEther("0.05")});
//         }catch (e) {
//             err = e.message;
//         }
//         expect(err).to.equal(
//           "VM Exception while processing transaction: reverted with reason string 'Auction paused'"
//         );
//     });
//     it("Reverts when the auction is over", async function () {
//         const aucitonWithOwner = auctionContract.connect(owner);
//         const auctionWithUser = auctionContract.connect(addr1);
//         await aucitonWithOwner.setPause(false);
//         let err = '';
//         try{
//             await auctionWithUser.bid({ value: 200});
//         }catch (e) {
//             err = e.message;
//         }
//         expect(err).to.equal(
//           "VM Exception while processing transaction: reverted with reason string 'Auction is over'"
//         );
//     });
//     it("Allows user to bid", async function () {
//         const aucitonWithOwner = auctionContract.connect(owner);
//         const auctionWithUser = auctionContract.connect(addr1);
//         await aucitonWithOwner.end();
//         await aucitonWithOwner.start(1965127913, 200)
//         await auctionWithUser.bid({ value: 201});
//         expect(( await aucitonWithOwner.getHighestBid()).toString()).to.equal(
//             "201"
//         );
//     });
//     it("Requires higher bid", async function () {
//         const auctionWithUser = auctionContract.connect(addr1);
//         let err = '';
//         try{
//             await auctionWithUser.bid({ value: 200});
//         }catch (e) {
//             err = e.message;
//         }
//         expect(err).to.equal(
//           "VM Exception while processing transaction: reverted with reason string 'You have to offer more'"
//         );
//     });
// });
