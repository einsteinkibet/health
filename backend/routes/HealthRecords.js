const express = require('express');
const router = express.Router();
const healthRecordsContract = require('../config/blockchain');  // Import contract instance

// Route to add a health record
router.post('/addRecord', async (req, res) => {
  const { patientId, recordHash, fromAddress } = req.body;

  try {
    // Send the transaction to add the health record
    const receipt = await healthRecordsContract.methods
      .addRecord(patientId, recordHash)
      .send({ from: fromAddress, gas: 300000 });

    // Send success response with transaction receipt
    res.json({ success: true, receipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get records
router.get('/getRecords/:address', async (req, res) => {
  const { address } = req.params;

  try {
    // Call smart contract to get records for a specific address
    const records = await healthRecordsContract.methods.getRecords(address).call();
    res.json({ success: true, records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

