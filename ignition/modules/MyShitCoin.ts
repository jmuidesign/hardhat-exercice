// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import { vars } from 'hardhat/config'

const MyShitCoinModule = buildModule('MyShitCoinModule', (m) => {
  const myShitCoin = m.contract('MyShitCoin', [vars.get('SUPPLY_ADDRESS')])

  return { myShitCoin }
})

export default MyShitCoinModule
