const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function () {
  let dappazon
  let deployer, buyer

  beforeEach(async () =>{
    //Setuo accounts
    [deployer, buyer] = await ethers.getSigners()

    //Deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()

  })

  describe("Deloyment", () => {
    it("Sets the owner", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address)
    })
  })
  describe("Listing", () => {
    let transaction

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(
        1,
        "Shoes",
        "Clothing",
        "IMAGE",
        1,
        4,
        5
      )
      await transaction.wait()
    })
    it("Returns item attribute", async () => {
      const item = await dappazon.items(1)
      expect(item.id).to.equal(1)
    })
  })

})
