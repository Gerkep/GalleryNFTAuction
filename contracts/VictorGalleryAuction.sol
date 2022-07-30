// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VictorGalleryAuction is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
 
  using Strings for uint256;
  bool public paused = true;
  address auctionOwner;
  uint256 highestOffer;
  address highestBidder;
  uint256 endTime;
  uint256 startTime;
  mapping(address => uint256) bids;

  constructor() ERC721("VictorGalleryNFT", "VGN") {
    auctionOwner = msg.sender;
  }

  function _baseURI() pure internal override returns (string memory) {
    return "https://gymalpha.mypinata.cloud/ipfs/QmQS98C3AFsKZ2AfT1zjU1gcAV7JMEvtYPBmp91KYphWkH/";
  }
  
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
    require(_exists(tokenId), "Nonexistent token");
    string memory base = _baseURI();
    return string(abi.encodePacked(base, tokenId.toString(), ".json"));
  }

  function start(uint256 startAuction, uint256 endAuction, uint256 basePrice) public onlyOwner{
    require(paused, "Already running");
    paused = false;
    startTime = startAuction;
    endTime = endAuction;
    highestOffer = basePrice;
  }

  function bid() external payable{
      require(!paused, "Auction paused");
      require(block.timestamp > startTime, "Wait till the auction starts");
      require(block.timestamp < endTime, "Auction is over");
      require(msg.value + bids[msg.sender] > highestOffer, "You have to offer more");
      highestOffer = msg.value + bids[msg.sender];
      highestBidder = msg.sender;
      bids[msg.sender] += msg.value;
  }
  function withdraw() external {
    uint256 balance = bids[msg.sender];
    bids[msg.sender] = 0;
    payable(msg.sender).transfer(balance); 
  }
  function end() public onlyOwner{
    require(block.timestamp > endTime, "The time is not over");
    if(bids[highestBidder] == highestOffer && highestBidder != auctionOwner){
      _tokenIds.increment();
      _mint(highestBidder, _tokenIds.current());
      bids[highestBidder] = 0;
      payable(msg.sender).transfer(highestOffer);
    }
    paused = true;
    delete highestBidder;
    delete highestOffer;
  }
  function fastMint() public {//only for testing- DELETE BEFORE DEPLOYMENT!!!
    _mint(msg.sender, _tokenIds.current());
    _tokenIds.increment();
  }
  function setPause(bool isPaused) public onlyOwner{
    paused = isPaused;
  }
  function getHighestBid() public view returns(uint256){
    return highestOffer;
  }
  function getEndTime() public view returns(uint256){
    return endTime;
  }
  function getStartTime() public view returns(uint256){
    return startTime;
  }
    function getDeposit() public view returns(uint256){
    return bids[msg.sender];
  }
}
