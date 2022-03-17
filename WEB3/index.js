
const { getOwner, getrejects, getschedule, getTnxCount, getTnxStat, getTotalSupply, balanceOf, getAdmins, isApproved, getscheduleCount, getapprovals, getscheduleIds, getTokenBals, allowance, getWhiteList, getAuthorizers, getlastestblocknumber, getblock, getblocknumber, gettransactionfromblock, getTotalBals, isRejected, getrequiredapprovals } = require("./getterApi")

const { initialize, createAccount, validateSchedule, updateSchedule, createSchedule, undoApprovalMint, approveMint, changeRequirement, removeAuthorizer, addAuthorizer, removeAdmin, addAdmin, verifySchedule, decreaseAllowance, increaseAllowance, transferFrom, approve, transfer, generateToken, setWhiteList, removeWhiteList, rejectMint, scheduleStatus, zeroBalance, moveEscrow } = require("./setterApi")

module.exports = {initialize, moveEscrow, getOwner, getrejects, getschedule, getTnxCount, getTnxStat, getTotalSupply, balanceOf, getAdmins, isApproved, getscheduleCount, getapprovals, getscheduleIds, createAccount, validateSchedule, updateSchedule, createSchedule, undoApprovalMint, approveMint, changeRequirement, removeAdmin, addAdmin, verifySchedule, decreaseAllowance, increaseAllowance, transferFrom, approve, allowance, transfer, generateToken, getTokenBals, removeAuthorizer, addAuthorizer, setWhiteList, removeWhiteList, getWhiteList, getAuthorizers, getlastestblocknumber, getblock, getblocknumber, gettransactionfromblock, getTotalBals, rejectMint, isRejected, scheduleStatus, zeroBalance, getrequiredapprovals
}