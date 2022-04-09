//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./StringToLower.sol";
import "./UTF8StringLength.sol";

interface IERC20 {
    function transfer(address _to, uint256 _amount) external returns (bool);
}

contract BuyMeCoffee is StringToLower, UTF8StringLength {
    address private owner; // Contract owner
    uint256 private shareBalance; // Contract Share Balance

    // Mapping from Address to Username
    mapping(string => address) private addressByUsername;

    // Mapping from Username to Address
    mapping(address => string) private usernameByAddress;

    // Mapping from Address to balance
    mapping(address => uint256) private balance;

    // Mapping from Address to Donors
    mapping(address => uint256) private donors;

    // Emits a donation Event
    event Donation(
        address indexed sender,
        address indexed reciever,
        uint256 amount,
        string message
    );

    // Emits a User Createtion event
    event UserCreated(address indexed owner, string username);

    // Emits a withdrawal event
    event Withdrawal(address indexed account, uint256 amount);

    constructor() {
        owner = msg.sender;
        usernameByAddress[msg.sender] = "qudusayo";
        addressByUsername["qudusayo"] = msg.sender;
    }

    // Only Owner Modifier
    modifier _OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Only Existing User modifier
    modifier _OnlyExistingUser(string memory _username) {
        require(
            addressByUsername[_toLower(_username)] !=
                0x0000000000000000000000000000000000000000,
            "User doesn't exist"
        );
        _;
    }

    // Get Address for a specific username
    function getAddressWithUsername(string memory _username)
        public
        view
        _OnlyExistingUser(_username)
        returns (address)
    {
        return addressByUsername[_toLower(_username)];
    }

    // Get Username for a specific address
    function getUsernameWithAddress(address _address)
        public
        view
        returns (string memory)
    {
        return usernameByAddress[_address];
    }

    // Get Balance of a specific User with Address
    function balanceOfAddress(address _address) public view returns (uint256) {
        return balance[_address];
    }

    // Get Balance of a specific User with username
    function balanceOfUsername(string memory _username)
        public
        view
        _OnlyExistingUser(_username)
        returns (uint256)
    {
        return balance[getAddressWithUsername(_toLower(_username))];
    }

    // Donation Function Call
    function donate(string memory _username, string memory _note)
        public
        payable
        _OnlyExistingUser(_username)
    {
        balance[addressByUsername[_toLower(_username)]] += msg.value;

        emit Donation(
            msg.sender,
            addressByUsername[_toLower(_username)],
            msg.value,
            _note
        );
    }

    // Register a new Username for a wallet
    function registerName(string memory _username) public payable {
        require(
            utfStringLength(_username) >= 3,
            "Username must be longer than 3 characters"
        );
        require(
            addressByUsername[_toLower(_username)] ==
                0x0000000000000000000000000000000000000000,
            "User already exist"
        );
        require(
            keccak256(abi.encodePacked(usernameByAddress[msg.sender])) !=
            keccak256(abi.encodePacked("")), "User alredy registered"
        );

        usernameByAddress[msg.sender] = _toLower(_username);
        addressByUsername[_toLower(_username)] = msg.sender;

        emit UserCreated(msg.sender, _username);
    }

    // Total Money Left In the contract
    function getTotalBalance() public view _OnlyOwner returns (uint256) {
        return address(this).balance;
    }

    // Contract Share Balance
    function getShareBalance() public view _OnlyOwner returns (uint256) {
        return shareBalance;
    }

    // Withdrawal from Donations
    function donationWithdrawal(uint256 amount) public {
        require(amount > balance[msg.sender], "Insufficient Balance");
        shareBalance += (amount * 10) / 100;
        balance[msg.sender] -= amount;
        address payable recipient = payable(msg.sender);
        recipient.transfer((amount * 90) /100);
    }

    // Withdrawal from Contract
    function withdrawal() public _OnlyOwner {
        address payable manager = payable(msg.sender);
        manager.transfer(shareBalance);
    }

    function withdrawToken(address _tokenContract, uint256 _amount)
        external
        _OnlyOwner
    {
        IERC20 tokenContract = IERC20(_tokenContract);

        // transfer the token from address of this contract
        // to address of the user (executing the withdrawToken() function)
        tokenContract.transfer(msg.sender, _amount);
    }
}
