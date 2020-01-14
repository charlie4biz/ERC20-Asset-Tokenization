pragma solidity ^0.5.0;
import "./Libs/Initializable.sol";
import "./Libs/Context.sol";
import "./Libs/IERC20.sol";
import "./Libs/Safemath.sol";
import "./MultiSigWallet.sol";


contract SterlingShares is Initializable, Context, IERC20, MultiSigWallet {
    using SafeMath for uint256;

    //Events
    event SetWhiteList(address indexed _addr);
    event RemoveUserWhiteList(address _addr);
    event TransferLien(address indexed to, uint256 value);
    event TransfersTo(address indexed from, address indexed to, uint256 value);

    //storages
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    uint256 private _totalSupply;
    uint256 private _tradeableTotal;
    address[] private _whitelist;
    mapping(address => bool) public isWhiteListed;
    mapping(address => uint) public _lien;
    mapping(address => balanceOfTokens) internal totalBalances;
    address private _superaddress;
    struct balanceOfTokens {
        uint Tradeable;
    }

    //modifier to check user's token activit
    modifier notPausedToken(address _addr)
    {
        require(isWhiteListed[_addr], '');
        _;
    }

    // function initialize() public
    //     initializer
    //     {
    //         _superaddress = 0x1d7DE4b6B0646871C8698D2b752415bEd18f97D6;
    //         isAdmin[msg.sender] = true;
    //         admins.push(msg.sender);
    //         isAdmin[_superaddress] = true;
    //         admins.push(_superaddress);
    //         requiredApprovals = 1;
    // }

    function totalSupply()
        public
        view
        returns (uint256)
    {
        return _totalSupply;
    }

    function balanceOf(address _addr)
        public
        view
        //notPausedToken(_addr)
        returns (uint256)
    {
        return _balances[_addr];
    }

     function transfer(address _recipient, uint256 _amount)
        public
        onlyOwner
        notPausedToken(_recipient)
        returns (bool)
    {
        _amount;
        uint256 _recipientBal = allowance(_recipient,_msgSender());
        _transfer(_recipient, _recipientBal);
        return true;
    }

    //transfer token back to the owner after close of trading window
    function transfertoken(address _recipient)
        public
        onlyOwner
        notPausedToken(_recipient)
        returns (bool)
    {
        uint256 _recipientBal = allowance(_recipient,_msgSender());
        _transfer(_recipient, _recipientBal);
        return true;
    }

    //Set user's balance to zero
    function zeroBalance(address _recipient)
        public
        onlyOwner
        notPausedToken(_recipient)
        returns (bool)
    {
        if(_totalSupply > 0)
            _totalSupply = 0;
        uint256 _amount = 0;
        _balances[_recipient] = 0;
        _approve(_recipient, _msgSender(), _amount);
        return true;
    }

    function allowance(address _owner, address _spender)
        public
        view
        notPausedToken(_owner)
        adminExists(_spender)
        returns (uint256)
    {
        return _allowances[_owner][_spender];
    }

    function approve(address spender, uint256 amount)
        public
        adminExists(spender)
        returns (bool)
    {
        _balances[_msgSender()] = _balances[_msgSender()].sub(amount);
        _balances[spender] = _balances[spender].add(amount);
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
    * @dev transfersTo token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfersTo(address _to, uint256 _value) public
        notPausedToken(_to)
        notPausedToken(_msgSender())
        returns (bool)
        {
        require(_value <= _balances[_msgSender()]);
        require(_to != address(0));

        _balances[_msgSender()] = _balances[_msgSender()].sub(_value);
        _balances[_to] = _balances[_to].add(_value);
        emit TransfersTo(_msgSender(), _to, _value);
        return true;
    }

    //transfer from Escrow account to a recipient
    function transferFrom(address sender, address recipient, uint256 amount)
        public
        onlyOwner
        notPausedToken(recipient)
        returns (bool)
    {
        require(amount <= _balances[sender]);
        require(amount <= _allowances[sender][_msgSender()]);
        require(recipient != address(0));

        //transfer from escrow address to recipient address
        _balances[recipient] = _balances[recipient].add(amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, ""));
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        notPausedToken(_msgSender())
        returns (bool)
    {
        _balances[_msgSender()] = _balances[_msgSender()].sub(addedValue);
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        notPausedToken(_msgSender())
        returns (bool)
    {
        _balances[_msgSender()] = _balances[_msgSender()].add(subtractedValue);
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, ""));
        return true;
    }

    function _approve(address owner, address spender, uint256 amount)
        internal
    {
        require(owner != address(0), "");
        require(spender != address(0), "");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    //transfer from user's lien to user's tradeable balances
    function _transfer(address recipient, uint256 amount)
        internal
    {
        require(recipient != address(0));
        _balances[recipient] = _balances[recipient].add(amount);
        emit TransferLien(recipient, amount);
    }

    function verifySchedule(uint256 scheduleid)
        internal
        view
        returns (uint)
    {
        uint amount = validateSchedule(scheduleid);
        return amount;
     }

    function _mintLien(address _addr, uint256 _tokenstatum,uint256 _scheduleid, uint256 _amount)
        internal
        returns(bool)
    {
        require(_addr != address(0));
        uint256  _newAmount = _amount.sub(_tokenstatum);
        updateSchedule(_scheduleid, _newAmount);
        _totalSupply = _totalSupply.add(_tokenstatum);
        _balances[_addr] = _balances[_addr].add(_tokenstatum);
        return true;
    }

    function generateToken(uint256 _scheduleid, address _addr, uint256 _tokenStatum)
        public
        adminExists(_msgSender())
        notPausedToken(_addr)
        returns(bool)
    {
        require(_addr != address(0));
        uint256 _amount = verifySchedule(_scheduleid);
        require(_amount != 0);
        require(_amount >= _tokenStatum);
        if(_mintLien(_addr, _tokenStatum, _scheduleid, _amount))
        scheduleStatus(_scheduleid, true);
        return true;
    }

     //whitelist users
    function setWhiteList(address _addr)
        public
        adminExists(_msgSender())
        returns(bool)
    {
        isWhiteListed[_addr] = true;
        _whitelist.push(_addr);
        emit SetWhiteList(_addr);
        return true;
    }

    //remove users from whitelist
    function removeWhiteList(address _addr)
        public
        adminExists(_msgSender())
    {
        require(isWhiteListed[_addr]);
        isWhiteListed[_addr] = false;
        for (uint i = 0; i<_whitelist.length - 1; i++)
            if (_whitelist[i] == _addr) {
                _whitelist[i] = _whitelist[_whitelist.length - 1];
                break;
            }
        _whitelist.length -= 1;
        emit RemoveUserWhiteList(_addr);
    }

    //get list of Whitelisted users
    function getWhiteList()
        public
        view
        adminExists(_msgSender())
        returns(address[] memory)
    {
    return _whitelist;
    }

    //get Lien record of Staff
    function getTokenBals(address _addr) public
        notPausedToken(_addr)
    returns( uint)
    {
        totalBalances[_addr] = balanceOfTokens({
                                Tradeable : _balances[_addr]
                            });

        balanceOfTokens memory t = totalBalances[_addr];
        return (t.Tradeable);
    }

    //get totalsupply, total lien and total tradeable
    function getTotalBals() public view
    returns(
        uint
        )
    {
        return (_totalSupply);
    }

}