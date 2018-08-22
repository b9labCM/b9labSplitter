pragma solidity ^0.4.18;


import "./Owned.sol";

contract Stoppable is Owned {
    bool isRunning;
    
    event LogPausedContract(address sender);
    event LogResumeContract(address sender);
    
    modifier onlyIfRunning {
        require(isRunning);
        _;
    }
    
    constructor() public  {
        isRunning = true;
    }
    
    function pauseContract() public onlyOwner onlyIfRunning returns(bool success) {
	emit LogPausedContract(msg.sender);        
	isRunning = false;
        
        return true;
    }
    
    function resumeContract() public onlyOwner returns(bool success) {
        require(!isRunning);
	emit LogResumeContract(msg.sender);
        isRunning = true;
        
        return true;
    }
}
