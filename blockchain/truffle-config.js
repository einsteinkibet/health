module.exports = {
  networks: {
    // Local development network (Ganache)
    development: {
      host: "127.0.0.1",   // Localhost
      port: 7545,          // Ganache default port
      network_id: "*",     // Match any network id
    },
  },

  // Solidity compiler settings
  compilers: {
    solc: {
      version: "0.8.21",     // Use Solidity 0.8.21
      settings: {
        optimizer: {
          enabled: true,     // Enable optimizer
          runs: 200,         // Optimize for how many times code will run
        },
      },
    },
  },

  // Optional: DB disabled (Truffle DB is deprecated)
  db: {
    enabled: false,
  },
};
