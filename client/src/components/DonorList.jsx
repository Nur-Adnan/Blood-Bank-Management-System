// src/components/DonorList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/donors")
      .then((response) => {
        setDonors(response.data);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">Donor List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && (
          <p className="text-red-500 text-center col-span-full">{error}</p>
        )}
        {donors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-200 hover:scale-105"
          >
            <h2 className="text-xl font-bold">{donor.name}</h2>
            <p>Email: {donor.email}</p>
            <p>Phone: {donor.phone}</p>
            <p>NID Number: {donor.nidNumber}</p>
            <p>Address: {donor.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorList;
