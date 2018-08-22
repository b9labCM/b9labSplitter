pragma solidity ^0.4.18;


contract Owned {
    address private owner;
    /*Since this contract will be inherited from, you may want to avoid the developer making the mistake of overwriting the owner from a child contract.
	How would you do that? */
    
    event LogChangeOwner(address indexed sender, address indexed newOwner);
    
    // Only calls by the owner are accepted
    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }
    
    // The Ownable constructor sets the original `owner` of the contract to the sender account.
    constructor() public {
        owner = msg.sender;
    }
    
    // Allows the current owner to transfer control of the contract to a newOwner.
    function changeOwner(address newOwner) public onlyOwner returns(bool success){
	require(newOwner != address(0));
        emit LogChangeOwner(msg.sender, newOwner);
        owner = newOwner;
        
        return true;
        
    }
}
