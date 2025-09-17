// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract HealthRecords {

    struct HealthRecord {
        string patientId;
        string recordHash;
    }

    mapping(address => HealthRecord[]) public records;

    // Event for adding a health record
    event RecordAdded(address indexed fromAddress, string patientId, string recordHash);

    // Function to add a health record
    function addRecord(string memory patientId, string memory recordHash) public {
        // Ensure the inputs are not empty
        require(bytes(patientId).length > 0, "Patient ID is required");
        require(bytes(recordHash).length > 0, "Record hash is required");

        // Add the health record to the mapping
        records[msg.sender].push(HealthRecord(patientId, recordHash));

        // Emit the event
        emit RecordAdded(msg.sender, patientId, recordHash);
    }

    // Function to get all health records of a patient by address
    function getRecords(address patientAddress) public view returns (HealthRecord[] memory) {
        return records[patientAddress];
    }
}
