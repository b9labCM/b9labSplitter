
pragma solidity ^0.4.18;

//import "./Owned.sol";
import "./Stoppable.sol";

contract Splitter is Stoppable {
    
    mapping(address => uint) private balances;
    
    
    event LogSplitTransaction(address indexed sender,address indexed receiver1, address indexed receiver2, uint amount);
    event LogWithDraw(address indexed sender, uint amount);
    
    constructor() public {
       
    }
    
    
    /* This function split a given amount between other two addresses. */
    function splitAmount(address receiver1, address receiver2) public payable onlyIfRunning returns(bool success) {
	// Input validation
        require(receiver1 != address(0));
        require(receiver2 != address(0));
        require (receiver1 != receiver2);
        require (msg.value > 0);
        // Split the amount 
        
        uint splittedAmount = msg.value/2;

	// Log the transaction
        emit LogSplitTransaction(msg.sender,receiver1, receiver2, msg.value);

        // Update receivers' balances
        balances[receiver1] += splittedAmount;
        balances[receiver2] += splittedAmount;
        // Check remainder and update sender's balance
        uint remainder = msg.value % 2;
	if (remainder > 0) {
    		balances[msg.sender] += remainder;
	}
        
        
        return true;
    }
    
    function f2withdraw(uint amount) public onlyIfRunning returns(bool success){
	require(amount > 0);
	require(balances[msg.sender] > 0);
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
	emit LogWithDraw(msg.sender, amount);
        msg.sender.transfer(amount);
        return true;
    
    }
    
        
    function withdraw() public onlyIfRunning returns(bool success){
	require(balances[msg.sender] > 0);
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
        return true; 
    }

   function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}

}
