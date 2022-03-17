const connect = require('./web3config.js')

    unlockSuperAdmin = async ()=>{
     unlocked = await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
     return unlocked
    }

    //Token smart connect.contract methods
    exports.generateToken = async (_scheduleId, _addr, _amount, _from, _passwrd)=>{ 
      try {
          if (_passwrd) {
            const result = connect.contract.methods.generateToken(_scheduleId, _addr, _amount)
           const nonce = await connect.web3.eth.getTransactionCount(_from)
           const data = result.encodeABI();
           const tx = {
                  nonce:  nonce,
                  from: _from ,
                  to: connect.address,
                  data: data,
                  gas: 2000000,
                  gasPrice: 0
           }
           await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
           const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
           serializetx = schedule.raw
           const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
           return sendtx
          } else {
            await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
            sendtx = await connect.contract.methods.generateToken(_scheduleId, _addr, _amount).send({from: connect.account })
          return sendtx
          }
           
      } catch (error) {
        console.log("got to web3 error >", error)
          err = {
            name : "Web3-GenerateToken",
            error : error,
        }
      throw err
      }
    },

    exports.moveEscrow = async (_address)=>{ 
      try {
           await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
           const result = await connect.contract.methods.transfertoken(_address).send({from : connect.account})
           return result;
      
      } catch (error) {
        err  = {
          name : "Web3-Transfer",
          error : error
      }
      throw err
      }
    },

    exports.transfer = async (_to, _amount, _from, _passwrd)=>{ 
      console.log("password > ",_to, _amount, _from, _passwrd)
      try {
          
           const result = connect.contract.methods.transfersTo(_to, _amount)
           const nonce = await connect.web3.eth.getTransactionCount(_from)
           const data = result.encodeABI();
           const tx = {
                  nonce:  nonce,
                  from: _from ,
                  to: connect.address,
                  data: data,
                  gas: 2000000,
                  gasPrice: 0
           }
           await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
           const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
           serializetx = schedule.raw
           const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
           return sendtx
      
      } catch (error) {
        err  = {
          name : "Web3-TransfersTo",
          error : error
      }
      throw err
      }
    },

    exports.zeroBalance = async (_address)=>{ 
      try {
           await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
           const result = await connect.contract.methods.zeroBalance(_address).send({from : connect.account})
           return result;
      
      } catch (error) {
        err  = {
          name : "Web3-ZeroBalance",
          error : error
      }
      throw err
      }
    },

    exports.approve = async (_spender, _amount, _from, _passwrd)=>{ 
      try {
                    
          const result = connect.contract.methods.approve(_spender, _amount)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
      
      } catch (error) {
        err = {
          name : "Web3-Approve",
          error : error
        }
        throw err
      }
    },

    exports.transferFrom = async (_sender, _recipient, _amount, _from, _passwrd)=>{ 
      try {
          if(_passwrd){
          const result = connect.contract.methods.transferFrom(_sender, _recipient, _amount)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
        }
        else{
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          sendtx = await connect.contract.methods.transferFrom(_sender, _recipient, _amount).send({from: connect.account })
          return sendtx
         }
      } catch (error) {
        err = {
          name : "Web3-TransferFrom",
          error : error
        }
        throw err
      }
    },

    exports.increaseAllowance = async (_spender, _addedValue, _from, _passwrd)=>{ 
      try {
          
          const result = connect.contract.methods.increaseAllowance(_spender, _addedValue)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
      
      
      } catch (error) {
        err = {
          name : "Web3-IncreaseAllowance",
          error : error
        }
        throw err
      }
    },

    exports.decreaseAllowance = async (_spender, _subtractedValue, _from, _passwrd) => { 
      try {
          
          const result = connect.contract.methods.decreaseAllowance(_spender, _subtractedValue)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
      
      } catch (error) {
        err = {
          name : "Web3-DecreaseAllowance",
          error : error
        }
        throw err
      }
    },

    exports.verifySchedule = async (_scheduleid, _from, _passwrd)=>{ 
      try {
          
          const result = connect.contract.methods.verifySchedule(_scheduleid)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
      
      } catch (error) {
        err = {
          name : "Web3-VerifySchedule",
          error : error
        }
        throw err
      }
    },

    //MultiSig wallet
    exports.addAuthorizer = async (_authorizer) =>{ 
      try {
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          const result = await connect.contract.methods.addauthorizer(_authorizer).send({from : connect.account})
          return result;
      
      } catch (error) {
        err = {
          name : "Web3-AddAuthorizer",
          error : error
        }
        throw err
      }
    },

    exports.removeAuthorizer = async (_authorizer) => { 
      try {
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          const result = await connect.contract.methods.removeauthorizer(_authorizer).send({from : connect.account})
          return result;
      
      } catch (error) {
        err = {
          name : "Web3-RemoveAuthorizer",
          error : error
        }
      throw err
      }
    },
    
    exports.addAdmin = async (_admin)=>{ 
      try {
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          //await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          const result = await connect.contract.methods.addadmin(_admin).send({from : connect.account})
          return result;
      
      } catch (error) {
        err = {
          name : "Web3-AddAdmin",
          error : error
        }
      throw err
      }
    },

    exports.removeAdmin = async (_admin)=>{ 
      try {
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          const result = await connect.contract.methods.removeadmin(_admin).send({from : connect.account})
          return result;
      
      } catch (error) {
        err = {
          name : "Web3-RemoveAdmin",
          error : error
        }
      throw err
      }
    },
    
    exports.changeRequirement = async (_requiredApprovals)=>{ 
      try {
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          const result = await connect.contract.methods.changeRequirement(_requiredApprovals).send({from : connect.account})
          return result;
      
      } catch (error) {
        err = {
          name : "Web3-ChangeRequirement",
          error : error
        }
        throw err
      }
    },

    exports.approveMint = async (_scheduleId, _status, _comment, _from, _passwrd)=>{ 
      try {
          const result1 = connect.contract.methods.approveSchedule(_scheduleId, _status, _comment)
          const nonce1 = await connect.web3.eth.getTransactionCount(_from)
          const data1 = result1.encodeABI();
          const tx1 = {
                 nonce:  nonce1,
                 from: _from ,
                 to: connect.address,
                 data: data1,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule1 = await connect.web3.eth.signTransaction(tx1, _passwrd)
          serializetx1 = schedule1.raw
          const sendtx1 = await connect.web3.eth.sendSignedTransaction(serializetx1)
          _event = await connect.contract.getPastEvents( 'ScheduleApproved', { fromBlock: sendtx1.blockNumber});
          
          if (sendtx1.status) {
            scheduleStatus = await connect.contract.methods.isApproved(_scheduleId).call()
            switch (scheduleStatus) {
              case '1':
                return 'Approved'
                break;
              case '2':
                return 'Rejected'
                break;
              default:
                return 'Pending'
                break;
            }
          }
      
      } catch (error) {
        err = {
          name : "Web3-ApprovalMint",
          error : error
        }
        throw err
      }
    }

    exports.undoApprovalMint = async (_scheduleId, _from, _passwrd)=>{ 
      try {
          
          const result = connect.contract.methods.undoApproval(_scheduleId)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
      
      } catch (error) {
        err = {
          name : "Web3-UndoApprovalMint",
          error : error
        }
        throw err
      }
    },

    exports.createSchedule = async (_amount, _from, _passwrd)=>{ 
      try { 
          if(_passwrd){
            const result = connect.contract.methods.createSchedule(_amount)
            const nonce = await connect.web3.eth.getTransactionCount(_from)
            const data = result.encodeABI();
            const tx = {
                   nonce:  nonce,
                   from: _from ,
                   to: connect.address,
                   data: data,
                   gas: 2000000,
                   gasPrice: 0
            }
           
            await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
            scheduleid = await connect.web3.eth.signTransaction(tx, _passwrd)
                        
            serializetx = scheduleid.raw
            const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
            _event = await connect.contract.getPastEvents( 'NewSchedule', { fromBlock: sendtx.blockNumber});
            scheduleMint = new Object()
            scheduleMint.transactionHash = _event[0].transactionHash
            scheduleMint.blockHash = _event[0].blockHash
            scheduleMint.blockNumber = _event[0].blockNumber
            scheduleMint.scheduleId = _event[0].returnValues.scheduleId
          
            return scheduleMint
          }
          else{
            
            sendtx = await connect.contract.methods.createSchedule(_amount).send({from: connect.account })
            _event = await connect.contract.getPastEvents( 'NewSchedule', { fromBlock: sendtx.blockNumber});
            scheduleMint = new Object()
            scheduleMint.transactionHash = _event[0].transactionHash
            scheduleMint.blockHash = _event[0].blockHash
            scheduleMint.blockNumber = _event[0].blockNumber
            scheduleMint.scheduleId = _event[0].returnValues.scheduleId
          
            return scheduleMint
           }

      } catch (error) {
        err = {
          name : "Web3-CreateSchedule",
          error : error
        }
       throw err
      }
    },

    exports.updateSchedule = async (_scheduleId, _amount, _from, _passwrd)=>{ 
      try {
        if(_passwrd){
          const result = connect.contract.methods.updateSchedule(_scheduleId, _amount)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
        }
        else{
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          sendtx = await connect.contract.methods.updateSchedule(_scheduleId, _amount).send({from: connect.account })
          return sendtx
         }
      } catch (error) {
        err = {
          name : "Web3-UpdateSchedule",
          error : error
        }
      throw err
      }
    },

    exports.scheduleStatus = async (_scheduleId, _status, _from, _passwrd)=>{ 
      try {
        if(_passwrd){
          const result = connect.contract.methods.scheduleStatus(_scheduleId, _status)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
        }
        else{
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          sendtx = await connect.contract.methods.scheduleStatus(_scheduleId, _status).send({from: connect.account })
          return sendtx
         }
      } catch (error) {
        err = {
          name : "Web3-scheduleStatus",
          error : error
        }
      throw err
      }
    },

    exports.validateSchedule = async (_scheduleId, _from, _passwrd)=>{ 
      try {
          if(_passwrd){
          const result = connect.contract.methods.validateSchedule(_scheduleId)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
        }
        else{
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          sendtx = await connect.contract.methods.validateSchedule(_scheduleId).send({from: connect.account })
          return sendtx
         }
      } catch (error) {
        err = {
          name : "Web3-ValidateSchedule",
          error : error
      }
        throw err
      }
    },
    
    exports.createAccount = async (_passwrd) => {
      try {
        await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
        let addr = await connect.web3.eth.personal.newAccount(_passwrd)
         await connect.contract.methods.setWhiteList(addr).send({from : connect.account})
        return addr;
      } catch (error) {
        err = {
          name : "Web3-CreateAccount",
          error : error
        }
      throw err
      }
    }

    exports.setWhiteList = async (_addr, _from, _passwrd) => { 
      try {
          if(_passwrd){
          const result = connect.contract.methods.setWhiteList(_addr)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
        }else{
            await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
            sendtx = await connect.contract.methods.setWhiteList(_addr).send({from: connect.account })
            return sendtx
           }

      } catch (error) {
        err = {
          name : "Web3-SetWhiteList",
          error : error
      }
        throw err
      }
    },

    exports.removeWhiteList = async (_addr, _from, _passwrd) => { 
      try {
          if(_passwrd){
          const result = connect.contract.methods.removeWhiteList(_addr)
          const nonce = await connect.web3.eth.getTransactionCount(_from)
          const data = result.encodeABI();
          const tx = {
                 nonce:  nonce,
                 from: _from ,
                 to: connect.address,
                 data: data,
                 gas: 2000000,
                  gasPrice: 0
          }
          await connect.web3.eth.personal.unlockAccount(_from, _passwrd, 600)
          const schedule = await connect.web3.eth.signTransaction(tx, _passwrd)
          serializetx = schedule.raw
          const sendtx = await connect.web3.eth.sendSignedTransaction(serializetx)
          return sendtx
        }else{
          await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
          sendtx = await connect.contract.methods.removeWhiteList(_addr).send({from: connect.account })
          return sendtx
         }
      
      } catch (error) {
        err = {
          name : "Web3-RemoveWhiteList",
          error : error
      }
        throw err
      }
    }



