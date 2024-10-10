// src/components/RequestBlood.js
import React, { useState } from "react";
import axios from "axios";

function RequestBlood() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    bloodType: "",
    quantity: "",
    urgency: "",
    contactInfo: "",
  });

  const { fullName, address, bloodType, quantity, urgency, contactInfo } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/blood-requests",
        formData
      );
      console.log("Request Submitted:", res.data);
      alert("Blood request submitted successfully!");
      // Reset form after submission
      setFormData({
        fullName: "",
        address: "",
        bloodType: "",
        quantity: "",
        urgency: "",
        contactInfo: "",
      });
    } catch (err) {
      console.error("Error submitting request:", err.response.data);
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Request Blood</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={onChange}
          placeholder="Full Name"
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
          className="input input-bordered w-full"
        />
        <select
          name="bloodType"
          value={bloodType}
          onChange={onChange}
          required
          className="select select-bordered w-full"
        >
          <option disabled value="">
            Select Blood Type
          </option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={onChange}
          placeholder="Quantity (units)"
          required
          className="input input-bordered w-full"
        />
        <select
          name="urgency"
          value={urgency}
          onChange={onChange}
          required
          className="select select-bordered w-full"
        >
          <option disabled value="">
            Select Urgency
          </option>
          <option>Urgent</option>
          <option>Within 24 hours</option>
          <option>Within a week</option>
        </select>
        <input
          type="text"
          name="contactInfo"
          value={contactInfo}
          onChange={onChange}
          placeholder="Contact Information"
          required
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default RequestBlood;
