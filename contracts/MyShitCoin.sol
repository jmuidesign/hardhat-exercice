// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract MyShitCoin is IERC20 {
    string private _symbol;
    string private _name;
    uint8 private _decimals;
    uint256 private _totalSupply;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowed;

    constructor(address supplyAdress) {
        _symbol = "MSC";
        _name = "My Shit Coin";
        _decimals = 18;
        _totalSupply = 1_000_001_000_000_000_000_000_000;
        balances[supplyAdress] = _totalSupply;
        emit Transfer(address(0), supplyAdress, _totalSupply);
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowed[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        balances[sender] -= amount;
        allowed[sender][msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        return allowed[owner][spender];
    }
}
