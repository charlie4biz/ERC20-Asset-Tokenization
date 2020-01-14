const SterlingShares = artifacts.require('SterlingShares');
const assert = require('chai').assert;
const truffleAssert = require('truffle-assertions');


contract('SterlingShares', accounts => {

  beforeEach(async ()=>{
      this.token = await SterlingShares.new()
  });

  it("Should initialize constructor successfully", async ()=>{
      
    try {
      initialize =  await this.token.initialize();
      const requiredapprove = await this.token.requiredApprovals.call();
      const admins = await this.token.getadmins.call();
      initialize =  await this.token.initialize();
      console.log('Required Approvals >>>', requiredapprove.toNumber());
      console.log('Admins >>', admins)
      
    } catch (error) {
      console.log(error)
    }
    assert.equal(initialize.receipt.status, true, "Unable to Generate Token. Schedule not created");
  })

  



})