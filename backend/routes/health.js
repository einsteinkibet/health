import express from 'express';
import healthRecordsContract from '../config/blockchain.js';

const router = express.Router();

// Route to add a health record
router.post('/addRecord', async (req, res) => {
  const { patientId, recordHash, fromAddress } = req.body;

  try {
    const receipt = await healthRecordsContract.methods
      .addRecord(patientId, recordHash)
      .send({ from: fromAddress, gas: 300000 });

    res.json({ success: true, receipt });
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get records - FIXED: No multiple responses
router.get('/getRecords/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const records = await healthRecordsContract.methods.getRecords(address).call();
    res.json({ success: true, records });
  } catch (error) {
    console.error('Error getting records:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;