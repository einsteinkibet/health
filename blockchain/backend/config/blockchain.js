const receipt = await healthRecordsContract.methods
    .addRecord(patientId, recordHash)
    .send({ from: fromAddress, gas: 200000 });
