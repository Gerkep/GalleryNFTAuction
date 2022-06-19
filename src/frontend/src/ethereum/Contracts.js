import AuctionABI from "../ethereum/abis/AucitonABI";
import { ethers } from "ethers";
import { browserName, browserVersion } from "react-device-detect";



export const provider =  (browserName === "Chrome") ? new ethers.providers.Web3Provider(window.ethereum) : ethers.getDefaultProvider();
export const AuctionContract = new ethers.Contract("0x6cE91A326E53262B891c56eB59C594662ed9710a", AuctionABI, provider)