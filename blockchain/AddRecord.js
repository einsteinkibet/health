// src/AddRecord.js
import React, { useState } from 'react';
import axios from 'axios';

const AddRecord = () => {
  const [patientId, setPatientId] = useState('');
  const [recordHash, setRecordHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/health/addRecord', {
        patientId,
        recordHash,
        fromAddress,
      });

      setMessage('Record added successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error adding record.');
    }
  };

  return (
    <div>
      <h2>Add Health Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Record Hash:</label>
          <input
            type="text"
            value={recordHash}
            onChange={(e) => setRecordHash(e.target.value)}
            required
          />
        </div>
        <div>
          <label>From Address:</label>
          <input
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Record</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRecord;
