const { ADLogin, ADDetails, GetAccountInfo, IbsTransfer, SendEmail, ADUserByStaffId, SendOTP, VerifyOTP } = require("./SOAP")
const SharesTokenContract = require("./WEB3")
const { ADProfile } = require("./AD")

module.exports = {
    ADLogin, ADDetails, SharesTokenContract, GetAccountInfo, IbsTransfer, ADProfile, SendEmail, ADUserByStaffId, SendOTP, VerifyOTP
}