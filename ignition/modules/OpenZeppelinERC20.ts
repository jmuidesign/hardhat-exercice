// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const OpenZeppelinERC20Module = buildModule('OpenZeppelinERC20Module', (m) => {
  const openZeppelinERC20 = m.contract('OpenZeppelinERC20', [
    1000001000000000000000000n,
  ])

  return { openZeppelinERC20 }
})

export default OpenZeppelinERC20Module
