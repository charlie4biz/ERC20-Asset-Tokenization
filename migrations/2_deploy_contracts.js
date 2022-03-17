const Assets = artifacts.require('Assets.sol')
const Proxy = artifacts.require('OwnedUpgradeabilityProxy.sol')

module.exports = deployer => {
 
    deployer.deploy(Assets)
    console.log("Asset Token deployed")

    deployer.deploy(Proxy)
    console.log("Proxy deployed")

}

