const connect = require('./proxyconfig')

module.exports.upgradeTo = async _addr => { 
      try {
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          result =  await connect.contract.methods.upgradeTo( _addr).send({from : connect.account})
         
          return result
      
      } catch (error) {
          err = {
            name : "Web3-UpGradeTo",
            error : error,
        }
      return err
      }
    }

module.exports.transferProxyOwnership = async _addr => { 
    try {
      await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
        let result = await connect.contract.methods.transferProxyOwnership( _addr).send({from : connect.account})
        return result
    
    } catch (error) {
        err = {
          name : "Web3-TransferProxyOwnership",
          error : error,
      }
    return err
    }
  }