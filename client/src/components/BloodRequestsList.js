// src/components/BloodRequestsList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function BloodRequestsList() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/blood-requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blood requests:", error);
        setError("Failed to fetch blood requests.");
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Blood Requests</h1>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold">
              {request.fullName} - {request.bloodType}
            </h2>
            <p>{request.address}</p>
            <p>Quantity needed: {request.quantity} units</p>
            <p>Urgency: {request.urgency}</p>
            <p>Contact: {request.contactInfo}</p>
          </div>
        ))
      ) : (
        <p className="text-center">No blood requests found.</p>
      )}
    </div>
  );
}

export default BloodRequestsList;
