  const connect = require('./web3config.js')
  
    //contract initializer
    exports.initialize = async ()=>{ 
        try {
            await connect.web3.eth.personal.unlockAccount(connect.account,  connect.account_pass, 600)
            const result = await connect.contract.methods.initialize().send({from: connect.account})          
            return result;
        
        } catch (error) {
        err  = {
            name : "Web3-Initialize",
            error : error
        }
        throw err
        }
    },

    //Token Contract
    exports.getOwner = async ()=>{
        try {
            let result = await connect.contract.methods.owner().call()
            return result
        
        } catch (error) {
            err = {
                name : "Web3-Owner",
                error : error,
            }
            throw err
        }   
    }

    exports.getTnxCount = async ()=>{
        try {
            unlockSuperAdmin()
            let result = await connect.web3.eth.getTransactionCount(connect.account).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-TnxCount",
                error : error
            }
            throw err
        }
    }

    exports.getTnxStat = async (_tnx)=>{ 
        try {
           
            let result = await connect.web3.eth.getTransactionReceipt(_tnx).call()
           
            return result
        
        } catch (error) {
            err = {
                name : "Web3-TnxStat",
                error : error
            }
            throw err
        }
    }

    exports.getTotalSupply = async ()=>{
        try {
           
            let result = await connect.contract.methods.totalSupply().call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-TotalSupply",
                error : error,
            }
            throw err
        }
    }

    exports.balanceOf = async (_address)=>{
        try {
           
            let result = await connect.contract.methods.balanceOf(_address).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-BalanceOf",
                error : error,
            }
            throw err
        }
    }

    exports.allowance = async (_owner, _spender) =>{
        try {
           
            let result = await connect.contract.methods.allowance(_owner, _spender).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-Allowance",
                error : error,
            }
            throw err
        }
    }

    
    exports.getWhiteList = async (_passwrd) => {
        try {
            
                unlockSuperAdmin()
                let result = await connect.contract.methods.getWhiteList().call({from: connect.account })
                return result
            
        } catch (error) {
            err = {
                name : "Web3-GetWhiteList",
                error : error
            }
            throw err
        }
    }

    //Mint Contract
    exports.getAdmins = async () => {
        try {

            let result = await connect.contract.methods.getadmins().call()
            return result

        } catch (error) {
            err = {
                name : "Web3-GetAdmins",
                error : error,
            }
            throw err
        }
    }

    exports.isApproved = async _scheduleid =>{
        try {
            let result = await connect.contract.methods.isApproved(_scheduleid).call()
            return result
        } catch (error) {
            err = {
                name : "Web3-isApproved",
                error : error,
            }
            throw err
        }
    }

    exports.getscheduleCount = async (_pending, _iscompleted) =>{
        try {
           
            let result = await connect.contract.methods.getscheduleCount(_pending, _iscompleted).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-ScheduleCount",
                error : error
            }
            throw err
        }
    }

    exports.getschedule = async _scheduleid =>{
        try {
           
           result = await connect.contract.methods.schedules(_scheduleid).call()
            return result
                   
        } catch (error) {
            err = {
                name : "Web3-ScheduleCount",
                error : error
            }
            throw err
        }
    }

    exports.getrequiredapprovals = async () =>{
        try {
            let result = await connect.contract.methods.requiredApprovals().call()
            return result
        } catch (error) {
            err = {
                name : "Web3-GetApprovals",
                error : error
            }
            throw err
        }
    }

    exports.getapprovals = async _getapprovals =>{
        try {
            let approve = await connect.contract.methods.getapprovals(_getapprovals).call()
            _event = await connect.contract.getPastEvents( 'ScheduleApproved', { filter: {scheduleId: [_getapprovals]}});
            result = new Object()
                     result.approval = approve
                     result.comment = _event 

            return result
        } catch (error) {
            err = {
                name : "Web3-GetApprovals",
                error : error
            }
            throw err
        }
    }
    
    exports.getrejects = async _getrejects =>{
        try {
            let reject = await connect.contract.methods.getrejects(_getrejects).call()
            let _event = await connect.contract.getPastEvents( 'ScheduleApproved', {
                fromBlock: 0,
                toBlock: 'latest',
                filter: { scheduleId:_getrejects}
            });  
            const result = {}          
            if (_event.length > 0) {
                result._eventcomment = _event[0].returnValues.comment
                result.reject = reject
            }

            return result
        } catch (error) {
            err = {
                name : "Web3-GetRejects",
                error : error
            }
            throw err
        }
    }

    exports.getscheduleIds = async (_from, _to, _pending, _isCompleted) =>{
        try {
            let result = await connect.contract.methods.getscheduleIds(_from, _to, _pending, _isCompleted).call()
            return result
        } catch (error) {
            err = {
                name : "Web3-GetSchedules",
                error : error
            }
            throw err
        }
    }

    exports.getTokenBals = async _addr => {
        try {
            let balances = await connect.contract.methods.getTokenBals(_addr).call()
            result = {
                Lien : balances[0],
                Tradeable : balances[1]
            }
            return result
        } catch (error) {
            err = {
                name : "Web3-TokenBalances",
                error : error
            }
            throw err
        }
    }

    exports.getTotalBals = async () => {
        try {
            let balances = await connect.contract.methods.getTotalBals().call()
            result = {
                totalSupply : balances[0],
                lien : balances[1],
                tradeable : balances[2]
            }
            return result
        } catch (error) {
            err = {
                name : "Web3-TokenBalances",
                error : error
            }
            throw err
        }
    }


    exports.getAuthorizers = async () => {
        try {

            let result = await connect.contract.methods.getauthorizers().call()
            
            return result

        } catch (error) {
            err = {
                name : "Web3-Getauthorizers",
                error : error,
            }
            throw err
        }
    }

    // get latest block number
    exports.getlastestblocknumber = async () => {
        try {

            let result = await connect.web3.eth.getBlockNumber()
            return result

        } catch (error) {
            err = {
                name : "Web3-GetLastestBlockNumber",
                error : error,
            }
            throw err
        }
    }


    // get latest block
    exports.getblock = async () => {
        try {

            let result = await connect.web3.eth.getBlock('latest')
            return result

        } catch (error) {
            err = {
                name : "Web3-GetLastestBlock",
                error : error,
            }
            throw err
        }
    }

    // get latest 10 blocks
    exports.getblocknumber = async () => {
        try {

            let blocknumber = await connect.web3.eth.getBlockNumber()
            result = []
            for (let i = 0; i < 10; i++) {
                block = await connect.web3.eth.getBlock(blocknumber - i).then(results=>{
                result[i] = results
            })
              }
            return result
        } catch (error) {
            err = {
                name : "Web3-GetLastest10Block",
                error : error,
            }
            throw err
        }
    }

    // Inspect transaction within a block
    exports.gettransactionstatus = async _hash => {
        try {

            let result = await connect.web3.eth.getTransaction(_hash)
            
            return result

        } catch (error) {
            err = {
                name : "Web3-InspectBlock",
                error : error,
            }
            throw err
        }
    }
