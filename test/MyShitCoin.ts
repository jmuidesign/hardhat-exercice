import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { MyShitCoin } from '../typechain-types'

describe('MyShitCoin', function () {
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress
  let myShitCoin: MyShitCoin

  before(async function () {
    ;[owner, addr1, addr2] = await ethers.getSigners()
  })

  beforeEach(async function () {
    const MyShitCoin = await ethers.getContractFactory('MyShitCoin')
    myShitCoin = await MyShitCoin.deploy(owner.address)
    await myShitCoin.waitForDeployment()
  })

  describe('Constructor', function () {
    it('Should transfer total supply to supply address (owner)', async function () {
      const ownerBalance = await myShitCoin.balanceOf(owner.address)
      expect(await myShitCoin.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe('Name', function () {
    it('Should return correct name', async function () {
      expect(await myShitCoin.name()).to.equal('My Shit Coin')
    })
  })

  describe('Symbol', function () {
    it('Should return correct symbol', async function () {
      expect(await myShitCoin.symbol()).to.equal('MSC')
    })
  })

  describe('Decimals', function () {
    it('Should return correct decimals', async function () {
      expect(await myShitCoin.decimals()).to.equal(18n)
    })
  })

  describe('Total Supply', function () {
    it('Should return correct total supply', async function () {
      expect(await myShitCoin.totalSupply()).to.equal(
        1000001000000000000000000n
      )
    })
  })

  describe('Balance Of', function () {
    it('Should return correct balances', async function () {
      expect(await myShitCoin.balanceOf(owner.address)).to.equal(
        1000001000000000000000000n
      )
      expect(await myShitCoin.balanceOf(addr1.address)).to.equal(0n)
      expect(await myShitCoin.balanceOf(addr2.address)).to.equal(0n)
    })
  })

  describe('Transfer', function () {
    it('Should transfer tokens between accounts', async function () {
      await expect(
        myShitCoin.transfer(addr1.address, 50)
      ).to.changeTokenBalances(myShitCoin, [owner, addr1], [-50, 50])

      await expect(
        myShitCoin.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(myShitCoin, [addr1, addr2], [-50, 50])
    })

    it('Should emit Transfer event', async function () {
      await expect(myShitCoin.transfer(addr1.address, 50))
        .to.emit(myShitCoin, 'Transfer')
        .withArgs(owner.address, addr1.address, 50)
    })

    it('Should revert if sender has insufficient balance', async function () {
      await expect(myShitCoin.connect(addr1).transfer(addr2.address, 300n)).to
        .be.reverted
    })
  })

  describe('Approve', function () {
    it('Should approve a spender', async function () {
      await myShitCoin.approve(addr1.address, 100n)
      expect(await myShitCoin.allowance(owner.address, addr1.address)).to.equal(
        100n
      )
    })

    it('Should emit Approval event', async function () {
      await expect(myShitCoin.approve(addr1.address, 100n))
        .to.emit(myShitCoin, 'Approval')
        .withArgs(owner.address, addr1.address, 100n)
    })
  })

  describe('TransferFrom', function () {
    it('Should transfer tokens from one address to another', async function () {
      await myShitCoin.approve(addr1.address, 100n)
      await myShitCoin
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, 100n)
    })
  })

  describe('Allowance', function () {
    it('Should return correct allowance', async function () {
      await myShitCoin.approve(addr1.address, 100n)
      expect(await myShitCoin.allowance(owner.address, addr1.address)).to.equal(
        100n
      )
    })
  })
})
