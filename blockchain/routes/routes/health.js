// backend/routes/health.js
const express = require('express');
const router = express.Router();
const healthRecordsContract = require('../config/blockchain');

// Route to add a health record
router.post('/addRecord', async (req, res) => {
    const { patientId, recordHash, fromAddress } = req.body;

    try {
        const receipt = await healthRecordsContract.methods
            .addRecord(patientId, recordHash)
            .send({ from: fromAddress });

        res.status(200).json({ success: true, receipt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get health records by address
router.get('/getRecords/:address', async (req, res) => {
    const patientAddress = req.params.address;

    try {
        const records = await healthRecordsContract.methods
            .getRecords(patientAddress)
            .call();

        res.status(200).json({ success: true, records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
