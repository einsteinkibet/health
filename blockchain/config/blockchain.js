// backend/config/blockchain.js
const Web3 = require('web3');
const contract = require('../../blockchain/build/contracts/HealthRecords.json');  // ABI of the contract
require('dotenv').config();

const web3 = new Web3('http://127.0.0.1:7545');  // Ganache URL

const networkId = Object.keys(contract.networks)[0];  // Get network ID
const contractAddress = contract.networks[networkId].address;  // Deployed contract address

const healthRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);

module.exports = healthRecordsContract;
