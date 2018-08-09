
pragma solidity ^0.4.18;

import "./Owned.sol";
import "./Stoppable.sol";

contract Splitter is Stoppable {
    
    mapping(address => uint) public balances;
    
    bool isAlive;
    
    event LogSetIsAlive(address indexed sender, bool theNewState);
    event LogSplitTransaction(address receiver1, address receiver2, uint amount);
    
    
    constructor() public payable {
        isAlive = true;
    }
    
    function setIsAlive(bool newState) public onlyOwner onlyIfRunning returns(bool success) {
        isAlive = newState;
        emit LogSetIsAlive(msg.sender, newState);
        return true;
    }
    /* This function split a given amount between other two addresses. */
    function splitAmount(address receiver1, address receiver2) public payable onlyOwner onlyIfRunning returns(bool success) {
	// Input validation
        require(receiver1 != address(0));
        require(receiver2 != address(0));
        require (receiver1 != receiver2);
        require (msg.value > 0);
        // Split the amount 
        uint sent_amount = msg.value;
        uint splitted_amount = sent_amount/2;
        // Update receivers' balances
        balances[receiver1] += splitted_amount;
        balances[receiver2] += splitted_amount;
        // Check remainder and update sender's balance
        if(sent_amount % 2 > 0 ){
            balances[msg.sender] += 1;
        }
        // Log the transaction
        emit LogSplitTransaction(receiver1, receiver2, sent_amount);
        
        return true;
    }
    
    function f2withdraw(uint amount2wd) public onlyIfRunning payable returns(bool success){
	require(balances[msg.sender] > 0);
        require(amount2wd > 0);
        require(amount2wd <= balances[msg.sender]);
        //balances[msg.sender] = 0;
        balances[msg.sender] -= amount2wd;
        address member = msg.sender;
        member.transfer(amount2wd);
        return true;
    
    }
    
        
    function withdraw() public returns(bool success){
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
        return true; 
    }

   function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}

}
