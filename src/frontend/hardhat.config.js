require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

const RINKEBY_PRIVATE_KEY =
  "fe27f912b40e4782538668e87da9943b4abd51fdc3a167f21ecccecdc558c3b5";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // defaultNetwork: "rinkeby",
  solidity: "0.8.4",
  networks: {
    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/dcb61bd765eb40b08e2b0d54b450a375",
    //   accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    // },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/dcb61bd765eb40b08e2b0d54b450a375",
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: "E92B7TI9M862YTQ131TY9JXKIJMS6JWY75",
  },
};
