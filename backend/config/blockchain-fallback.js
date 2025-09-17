// Simple mock for when blockchain is not available
const mockContract = {
  methods: {
    addRecord: (patientId, recordHash) => ({
      send: async ({ from, gas }) => ({ 
        transactionHash: '0xmock' + Math.random().toString(16).substr(2), 
        status: true,
        blockNumber: Math.floor(Math.random() * 10000),
        from: from
      })
    }),
    getRecords: (address) => ({
      call: async () => [
        { 
          patientId: 'patient1', 
          recordHash: 'hash1234567890', 
          timestamp: Date.now() - 86400000 
        },
        { 
          patientId: 'patient2', 
          recordHash: 'hash0987654321', 
          timestamp: Date.now() - 172800000 
        }
      ]
    })
  }
};

export default mockContract;