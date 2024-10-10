// routes/bloodRequests.js
const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");

// POST a new blood request
router.post("/", async (req, res) => {
  try {
    const newRequest = new BloodRequest({
      fullName: req.body.fullName,
      address: req.body.address,
      bloodType: req.body.bloodType,
      quantity: req.body.quantity,
      urgency: req.body.urgency,
      contactInfo: req.body.contactInfo,
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all blood requests
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find({});
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blood requests: " + error.message });
  }
});

module.exports = router;
