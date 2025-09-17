import Web3 from 'web3';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let healthRecordsContract;

try {
  console.log('Trying to connect to blockchain...');
  
  // CORRECT PATH - adjust based on your actual folder structure
  const contractPath = join(__dirname, '../../blockchain/build/contracts/HealthRecords.json');
  console.log('Looking for contract at:', contractPath);
  
  const contractData = await readFile(contractPath, 'utf8');
  const contract = JSON.parse(contractData);
  
  const web3 = new Web3('http://127.0.0.1:7545');
  const contractAddress = '0xFDA19c9a3b78C201416A521df3a6aE234Bb8ebE3';
  
  healthRecordsContract = new web3.eth.Contract(contract.abi, contractAddress);
  console.log('Contract instance created successfully');
  
} catch (error) {
  console.log('Error creating contract instance:', error.message);
  
  // Mock contract
  healthRecordsContract = {
    methods: {
      addRecord: function(patientId, recordHash) {
        return {
          send: async function({ from, gas }) {
            console.log('MOCK: Adding record -', { patientId, recordHash, from });
            return { transactionHash: '0xmock123', status: true };
          }
        };
      },
      getRecords: function(address) {
        return {
          call: async function() {
            console.log('MOCK: Getting records for -', address);
            return [{ patientId: 'mock-patient', recordHash: 'mock-hash' }];
          }
        };
      }
    }
  };
}

export default healthRecordsContract;