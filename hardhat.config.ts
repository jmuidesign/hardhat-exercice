import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import { vars } from 'hardhat/config'

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${vars.get(
        'ALCHEMY_API_KEY'
      )}`,
      accounts: [vars.get('PRIVATE_KEY')],
    },
  },
  etherscan: {
    apiKey: vars.get('ETHERSCAN_API_KEY'),
  },
}

export default config
