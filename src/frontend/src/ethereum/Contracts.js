import AuctionABI from "../ethereum/abis/AucitonABI";
import { ethers } from "ethers";
import { browserName, browserVersion } from "react-device-detect";



export const provider =  (browserName === "Chrome") ? new ethers.providers.Web3Provider(window.ethereum) : ethers.getDefaultProvider();
export const AuctionContract = new ethers.Contract("0xD545001d9266DECf652fbD1B8eCe8160f32417FD", AuctionABI, provider)