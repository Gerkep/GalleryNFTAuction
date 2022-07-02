import AuctionABI from "../ethereum/abis/AucitonABI";
import { ethers } from "ethers";
import { browserName, browserVersion } from "react-device-detect";

let availableProvider = '';
let contract = '';

if (window.ethereum) {
    handleEthereum();
  } else {
    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    });
    setTimeout(handleEthereum, 3000);
  }
  
  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      availableProvider =  (browserName === "Chrome") ? new ethers.providers.Web3Provider(window.ethereum) : ethers.getDefaultProvider();
      contract =  new ethers.Contract("0xaaEa5e6A1356d488FCbCd0fF96F50677c8ad5c65", AuctionABI, availableProvider)
    } else {
      alert('If you want to use full functionality of our website please install metamask extension.');
    }
  }

export let provider = availableProvider;
export let AuctionContract = contract;