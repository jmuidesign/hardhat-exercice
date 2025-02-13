import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { OpenZeppelinERC20 } from '../typechain-types'

describe('OpenZeppelinERC20', function () {
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress
  let openZeppelinERC20: OpenZeppelinERC20

  before(async function () {
    ;[owner, addr1, addr2] = await ethers.getSigners()
  })

  beforeEach(async function () {
    const OpenZeppelinERC20 = await ethers.getContractFactory(
      'OpenZeppelinERC20'
    )
    openZeppelinERC20 = await OpenZeppelinERC20.deploy(
      1000001000000000000000000n
    )
    await openZeppelinERC20.waitForDeployment()
  })

  describe('Constructor', function () {
    it('Should transfer total supply to supply address (owner)', async function () {
      const ownerBalance = await openZeppelinERC20.balanceOf(owner.address)
      expect(await openZeppelinERC20.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe('Name', function () {
    it('Should return correct name', async function () {
      expect(await openZeppelinERC20.name()).to.equal('My Shit Coin')
    })
  })

  describe('Symbol', function () {
    it('Should return correct symbol', async function () {
      expect(await openZeppelinERC20.symbol()).to.equal('MSC')
    })
  })

  describe('Decimals', function () {
    it('Should return correct decimals', async function () {
      expect(await openZeppelinERC20.decimals()).to.equal(18n)
    })
  })

  describe('Total Supply', function () {
    it('Should return correct total supply', async function () {
      expect(await openZeppelinERC20.totalSupply()).to.equal(
        1000001000000000000000000n
      )
    })
  })

  describe('Balance Of', function () {
    it('Should return correct balances', async function () {
      expect(await openZeppelinERC20.balanceOf(owner.address)).to.equal(
        1000001000000000000000000n
      )
      expect(await openZeppelinERC20.balanceOf(addr1.address)).to.equal(0n)
      expect(await openZeppelinERC20.balanceOf(addr2.address)).to.equal(0n)
    })
  })

  describe('Transfer', function () {
    it('Should transfer tokens between accounts', async function () {
      await expect(
        openZeppelinERC20.transfer(addr1.address, 50)
      ).to.changeTokenBalances(openZeppelinERC20, [owner, addr1], [-50, 50])

      await expect(
        openZeppelinERC20.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(openZeppelinERC20, [addr1, addr2], [-50, 50])
    })

    it('Should emit Transfer event', async function () {
      await expect(openZeppelinERC20.transfer(addr1.address, 50))
        .to.emit(openZeppelinERC20, 'Transfer')
        .withArgs(owner.address, addr1.address, 50)
    })

    it('Should revert if sender has insufficient balance', async function () {
      await expect(
        openZeppelinERC20.connect(addr1).transfer(addr2.address, 300n)
      ).to.be.reverted
    })
  })

  describe('Approve', function () {
    it('Should approve a spender', async function () {
      await openZeppelinERC20.approve(addr1.address, 100n)
      expect(
        await openZeppelinERC20.allowance(owner.address, addr1.address)
      ).to.equal(100n)
    })

    it('Should emit Approval event', async function () {
      await expect(openZeppelinERC20.approve(addr1.address, 100n))
        .to.emit(openZeppelinERC20, 'Approval')
        .withArgs(owner.address, addr1.address, 100n)
    })
  })

  describe('TransferFrom', function () {
    it('Should transfer tokens from one address to another', async function () {
      await openZeppelinERC20.approve(addr1.address, 100n)
      await openZeppelinERC20
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, 100n)
    })
  })

  describe('Allowance', function () {
    it('Should return correct allowance', async function () {
      await openZeppelinERC20.approve(addr1.address, 100n)
      expect(
        await openZeppelinERC20.allowance(owner.address, addr1.address)
      ).to.equal(100n)
    })
  })
})
