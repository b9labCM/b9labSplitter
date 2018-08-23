var Splitter = artifacts.require("./Splitter.sol");
const BigNumber = require('bignumber.js');

contract('Splitter', function(accounts) {

	
	const account_A = accounts[0];
	const account_B = accounts[1];
	const account_C = accounts[2];
	const account_D = accounts[3];

	let newInstance;
	beforeEach("should create a Splitter contract", function() {
		return Splitter.new({ from: account_A, gas:2000000 })
			.then(_instance => newInstance = _instance)
	});

    	/*Test 1: Initial balance A should be zero*/
  	it("should be 0 in the first account", function() {
   	 	return Splitter.deployed().then(function(instance) {
			//return instance.balances(account_A);
    	  		return instance.getBalance.call(account_C);
   	 	}).then(function(balance) {
   	   		assert.equal(balance.valueOf(), 0, " first account has not 0 balance");
   	 	});
  	});

	/*Test 2: Initial balance B should be zero*/
  	it("should be 0 in the second account", function() {
   	 	return Splitter.deployed().then(function(instance) {
			//return instance.balances(account_B);
    	  		return instance.getBalance.call(account_D);
   	 	}).then(function(balance) {
   	   		assert.equal(balance.valueOf(), 0, " second account has not 0 balance");
   	 	});
  	});
	/*Test 3: Split Amount*/
	it("testing split ether", function(){
	   	return Splitter.deployed().then(function(instance) {
			inst = instance; 
    	    		return instance.getBalance.call(account_C);
   	 	}).then(balance =>  {
			balance_C_before = new BigNumber (balance);
			assert.equal(balance_C_before.valueOf(), 0, " first account C before has not 0 balance");
			return inst.getBalance.call(account_D);
			}).then(balance =>  {
			      	balance_D_before = new BigNumber (balance);
			     	assert.equal(balance_D_before.valueOf(), 0, " first account D before has not 0 balance");
				return inst.splitAmount(account_C,account_D,{ from: account_A, value: web3.toWei(0.4,"ether")})	
			}).then ( txObj => { 
			        assert.equal(txObj.receipt.status,1, "split failed");
				return inst.getBalance.call(account_C);
			}).then(balance =>  {
			      	balance_C_after = new BigNumber (balance);
				console.log(balance_C_after);
				splittedAmount = new BigNumber (web3.toWei(0.2,"ether"));
				splittedAmount_str = splittedAmount.toString(10);
				//console.log(splittedAmount_str);
			     	assert.equal(balance_C_after.valueOf(), splittedAmount, " account C has not the right amount of ether ");
				return inst.getBalance.call(account_D);
			}).then(balance =>  {
			      	balance_D_after = new BigNumber (balance);
				console.log(balance_D_after);
				assert.equal(balance_D_after.valueOf(), splittedAmount, " account D has not the right amount of ether ");
			     	
			})
	});


	/*Test 31: Test Withdraw with new instance*/
	it("testing split ether", function(){
	   	 return newInstance.getBalance.call(account_C)
   	 	.then(balance =>  {
			balance_C_before = new BigNumber (balance);
			assert.equal(balance_C_before.valueOf(), 0, " first account C before has not 0 balance");
			return newInstance.getBalance.call(account_D);
			}).then(balance =>  {
			      	balance_D_before = new BigNumber (balance);
			     	assert.equal(balance_D_before.valueOf(), 0, " first account D before has not 0 balance");
				return newInstance.splitAmount(account_C,account_D,{ from: account_A, value: web3.toWei(0.4,"ether")})	
			}).then ( txObj => { 
			        assert.equal(txObj.receipt.status,1, "split failed");
				return newInstance.getBalance.call(account_C);
			}).then(balance =>  {
			      	balance_C_after = new BigNumber (balance);
				console.log(balance_C_after);
				splittedAmount = new BigNumber (web3.toWei(0.2,"ether"));
				splittedAmount_str = splittedAmount.toString(10);
				//console.log(splittedAmount_str);
			     	assert.equal(balance_C_after.valueOf(), splittedAmount, " account C has not the right amount of ether ");
				return newInstance.getBalance.call(account_D);
			}).then(balance =>  {
			      	balance_D_after = new BigNumber (balance);
				console.log(balance_D_after);
				assert.equal(balance_D_after.valueOf(), splittedAmount, " account D has not the right amount of ether ");
			     	
			})
	}); 
	
	/*Test 4: Withdraw with deployed instance*/

	it("Testing withdraw function", function(){
		return Splitter.deployed().then(function(instance) {
			inst = instance; 
    	    		return inst.f2withdraw(web3.toWei(0.01, "ether"),{from:account_C})
			}).then ( _txObj => { 
				txObj = _txObj;
				//assert.equal(txObj.receipt.status,1, "withdrawal failed");
			})

	});  

	/*Test 41: Test Withdraw with new instance*/
	it("testing split ether", function(){
	   	 return newInstance.getBalance.call(account_C)
   	 	.then(balance =>  {
			balance_C_before = new BigNumber (balance);
			assert.equal(balance_C_before.valueOf(), 0, " first account C before has not 0 balance");
			return newInstance.getBalance.call(account_D);
			}).then(balance =>  {
			      	balance_D_before = new BigNumber (balance);
			     	assert.equal(balance_D_before.valueOf(), 0, " first account D before has not 0 balance");
				return newInstance.splitAmount(account_C,account_D,{ from: account_A, value: web3.toWei(0.4,"ether")})	
			}).then ( txObj => { 
			        assert.equal(txObj.receipt.status,1, "split failed");
				return newInstance.getBalance.call(account_C);
			}).then(balance =>  {
			      	balance_C_after = new BigNumber (balance);
				console.log(balance_C_after);
				splittedAmount = new BigNumber (web3.toWei(0.2,"ether"));
				splittedAmount_str = splittedAmount.toString(10);
				//console.log(splittedAmount_str);
			     	assert.equal(balance_C_after.valueOf(), splittedAmount, " account C has not the right amount of ether ");
				return newInstance.getBalance.call(account_D);
			}).then(balance =>  {
			      	balance_D_after = new BigNumber (balance);
				console.log(balance_D_after);
				assert.equal(balance_D_after.valueOf(), splittedAmount, " account D has not the right amount of ether ");
			     	return newInstance.f2withdraw(web3.toWei(0.01, "ether"),{from:account_C})
			}).then ( _txObj => { 
				txObj = _txObj;
				assert.equal(txObj.receipt.status,1, "withdrawal failed");
			})
	}); 


});
