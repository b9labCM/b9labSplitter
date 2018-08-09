module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 1000000 // Or any higher value that you deem necessary
        
    },
	net42: {
      host: "localhost",
      port: 8545,
      network_id: 42,
      gas: 800000
    }
}
};
