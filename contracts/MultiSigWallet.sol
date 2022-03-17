pragma solidity ^0.5.0;
import "./Ownable.sol";


contract MultiSigWallet is Ownable {
    event ScheduleApproved(address indexed sender, uint indexed scheduleId, string comment);
    event RevokeApproval(address indexed sender, uint indexed scheduleId);
    event NewSchedule(uint indexed scheduleId);
    event ScheduleUpdated(uint indexed scheduleId);
    event Deposit(address indexed sender, uint amount);
    event authorizerAddition(address indexed authorizer);
    event authorizerRemoval(address indexed authorizer);
    event adminAddition(address indexed admin);
    event adminRemoval(address indexed admin);
    event RequirementChange(uint requiredApprovals);
    uint constant public MAX_AUTHORIZE_COUNT = 5;
    address public _superaddress = 0x1d7DE4b6B0646871C8698D2b752415bEd18f97D6;
    mapping (uint => Schedule) public schedules;
    mapping (uint => mapping (address => Status)) public approvals;
    mapping (address => bool) public isAdmin;
    mapping (address => bool) public isAuthorizer;
    address[] public admins;
    address[] public authorizers;
    uint public requiredApprovals;
    uint public scheduleCount;
    enum Status {Pending, Approved, Rejected}
    struct Schedule {
        uint amount;
        bool isCompleted;
        bool isUnique;
    }

    modifier onlyContractOwner() {
        require(msg.sender == address(this));
        _;
    }
    modifier adminDoesNotExist(address admin) {
        require(!isAdmin[admin]);
        _;
    }

    modifier authorizerDoesNotExist(address authorizer) {
        require(!isAuthorizer[authorizer]);
        _;
    }

    modifier adminExists(address admin) {
        require(isAdmin[admin]);
        _;
    }

    modifier authorizerExists(address authorizer) {
        require(isAuthorizer[authorizer]);
        _;
    }

    modifier scheduleExists(uint scheduleId) {
        require(schedules[scheduleId].isUnique);
        _;
    }
    modifier adminApproved(uint scheduleId, address admin) {
        require(approvals[scheduleId][admin] == Status.Approved);
        _;
    }

    modifier authorizerApproved(uint scheduleId, address authorizer) {
        require(approvals[scheduleId][authorizer] == Status.Approved);
        _;
    }

    modifier notAdminApproved(uint scheduleId, address admin) {
        require(approvals[scheduleId][admin] != Status.Approved);
        _;
    }

    modifier notAuthorizerApproved(uint scheduleId, address authorizer) {
        require(approvals[scheduleId][authorizer] != Status.Approved);
        _;
    }

    modifier approved(uint scheduleId) {
        require(isApproved(scheduleId) == Status.Approved);
        _;
    }
    modifier notApproved(uint scheduleId) {
        require(isApproved(scheduleId) == Status.Pending);
        _;
    }
    modifier notscheduleCompleted(uint scheduleId) {
        require(!schedules[scheduleId].isCompleted, "");
        _;
    }
    modifier notNull(address _address) {
        require(_address != address(0x0), "");
        _;
    }

    modifier approvalRequirement(uint authorizerCount) {
        require (
            authorizerCount <= MAX_AUTHORIZE_COUNT && requiredApprovals <= authorizerCount && requiredApprovals != 0 && authorizerCount != 0, "");
        _;
    }
    function() external payable {
        if (msg.value > 0)
            emit Deposit(msg.sender, msg.value);
    }

    constructor() public
        {
            isAdmin[msg.sender] = true;
            admins.push(msg.sender);
            isAdmin[_superaddress] = true;
            admins.push(_superaddress);
            requiredApprovals = 1;
        }

    //SuperAdmin rights and functions
    function changeRequirement(uint _requiredApprovals) public
        onlyOwner
        approvalRequirement(authorizers.length)
    {
        require(_requiredApprovals > 0,'');
        requiredApprovals = _requiredApprovals;
        emit RequirementChange(_requiredApprovals);
    }

    //Authorizer Rights and Functions
    function addauthorizer(address authorizer) public
        onlyOwner
        authorizerDoesNotExist(authorizer)
        adminDoesNotExist(authorizer)
        notNull(authorizer)
        approvalRequirement(authorizers.length + 1)
    {
        isAuthorizer[authorizer] = true;
        authorizers.push(authorizer);
        emit authorizerAddition(authorizer);
    }

    function removeauthorizer(address _authorizer) public
        onlyOwner
        authorizerExists(_authorizer)
    {
        isAuthorizer[_authorizer] = false;
        for (uint i = 0; i<authorizers.length - 1; i++)
            if (authorizers[i] == _authorizer) {
                authorizers[i] = authorizers[authorizers.length - 1];
                break;
            }
        authorizers.length -= 1;
        if (requiredApprovals > authorizers.length)
            changeRequirement(authorizers.length);
        emit authorizerRemoval(_authorizer);
    }

     //Mint schedule management
    function approveSchedule(uint scheduleId, bool status, string memory comment) public
        authorizerExists(msg.sender)
        scheduleExists(scheduleId)
        //notApproved(scheduleId)
        notAuthorizerApproved(scheduleId, msg.sender)
    {
        if(status){
             approvals[scheduleId][msg.sender] = Status.Approved;
        }
        else if(!status){
            approvals[scheduleId][msg.sender] = Status.Rejected;
        }

        emit ScheduleApproved(msg.sender, scheduleId, comment);
    }

    function undoApproval(uint scheduleId) public
        authorizerExists(msg.sender)
        approved(scheduleId)
        notscheduleCompleted(scheduleId)
    {
        approvals[scheduleId][msg.sender] = Status.Pending;
        emit RevokeApproval(msg.sender, scheduleId);
    }

    function isApproved(uint scheduleId) public view
        returns (Status)
        {
        uint count = 0;
        for (uint i = 0; i<authorizers.length; i++) {
            if (approvals[scheduleId][authorizers[i]] == Status.Approved)
                count += 1;
            
            if (approvals[scheduleId][authorizers[i]] == Status.Rejected)
                return (Status.Rejected);
            }
        if (count == requiredApprovals)
            return Status.Approved;
        if(count < requiredApprovals)
            return Status.Pending;
        }


    //Admin rights and functions
    function addadmin(address admin ) public
        onlyOwner
        adminDoesNotExist(admin)
        authorizerDoesNotExist(admin)
        notNull(admin)
    {
        isAdmin[admin] = true;
        admins.push(admin);
        emit adminAddition(admin);
    }

    function removeadmin(address admin) public
        onlyOwner
        adminExists(admin)
    {
        isAdmin[admin] = false;
        for (uint i = 0; i<admins.length - 1; i++)
            if (admins[i] == admin) {
                admins[i] = admins[admins.length - 1];
                break;
            }
        admins.length -= 1;
        emit adminRemoval(admin);
    }

    function createSchedule(uint amount) public
        adminExists(msg.sender)
        returns (uint scheduleId)
    {
        scheduleId = _addSchedule(amount);
    }

    function updateSchedule(uint scheduleId, uint256 _amount) public
        adminExists(msg.sender)
        scheduleExists(scheduleId)
    {
        schedules[scheduleId].amount = _amount;
        emit ScheduleUpdated(scheduleId);
    }

    function scheduleStatus(uint scheduleId, bool _status) public
        adminExists(msg.sender)
        scheduleExists(scheduleId)
    {
        schedules[scheduleId].isCompleted = _status;
        emit ScheduleUpdated(scheduleId);
    }

    function validateSchedule(uint scheduleId) public view
        adminExists(msg.sender)
        scheduleExists(scheduleId)
        approved(scheduleId)
        returns(uint)
    {
        uint amount = schedules[scheduleId].amount;
        return amount;
    }


    function _addSchedule(uint _amount) internal
        returns (uint scheduleId)
    {
        scheduleId = scheduleCount;
        schedules[scheduleId] = Schedule({
            amount: _amount,
            isCompleted: false,
            isUnique : true
        });
        scheduleCount += 1;
        emit NewSchedule(scheduleId);
    }

    //Getters
    function getscheduleCount(bool pending, bool isCompleted) public view
        returns (uint count)
    {
        for (uint i = 0; i<scheduleCount; i++)
            if (   pending && !schedules[i].isCompleted || isCompleted && schedules[i].isCompleted)
                count += 1;
    }

    function getauthorizers() public view returns (address[] memory) {
        return authorizers;
    }

    function getadmins() public view returns (address[] memory) {
        return admins;
    }

    function getapprovals(uint scheduleId) public view returns (address[] memory _approvals) {
        address[] memory approvalsTemp = new address[](authorizers.length);
        uint count = 0;
        uint i;
        for (i = 0; i<authorizers.length; i++)
            if (approvals[scheduleId][authorizers[i]] == Status.Approved) {
                approvalsTemp[count] = authorizers[i];
                count += 1;
            }
        _approvals = new address[](count);
        for (i = 0; i<count; i++)
            _approvals[i] = approvalsTemp[i];
    }

    function getrejects(uint scheduleId) public view returns (address[] memory _approvals) {
        address[] memory approvalsTemp = new address[](authorizers.length);
        uint count = 0;
        uint i;
        for (i = 0; i<authorizers.length; i++)
            if (approvals[scheduleId][authorizers[i]] == Status.Rejected) {
                approvalsTemp[count] = authorizers[i];
                count += 1;
            }
        _approvals = new address[](count);
        for (i = 0; i<count; i++)
            _approvals[i] = approvalsTemp[i];
    }

    function getscheduleIds(uint from, uint to, bool pending, bool isCompleted) public view returns (uint[] memory _scheduleIds) {
        uint[] memory scheduleIdsTemp = new uint[](scheduleCount);
        uint count = 0;
        uint i;
        for (i = 0; i<scheduleCount; i++)
            if (   pending && !schedules[i].isCompleted || isCompleted && schedules[i].isCompleted)
            {
                scheduleIdsTemp[count] = i;
                count += 1;
            }
        _scheduleIds = new uint[](to - from);
        for (i = from; i<to; i++)
            _scheduleIds[i - from] = scheduleIdsTemp[i];
    }
}