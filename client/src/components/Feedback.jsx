import React, { useEffect, useState } from "react";
import API from "../services/API";
import Layout from "./shared/Layout/Layout";
import { useSelector } from "react-redux";

const FeedbackForm = () => {
  const [donors, setDonors] = useState([]);
  const [donorName, setDonorName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useSelector((state) => state.auth);

  // Fetch patient name and donors
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch donors
        const donorsResponse = await API.get("/feedback/donors-name");
        console.log("Fetched donors:", donorsResponse.data);
        setDonors(donorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = { patientName: user?.name, donorName, description };

    try {
      await API.post("/feedback/feedback-post", feedback);
      setDescription("");
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <Layout>
      <div className="md:pl-64 px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Feedback</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="patientName"
            >
              Patient Name
            </label>
            <input
              id="patientName"
              type="text"
              value={user?.name || ""}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="donorName"
            >
              Donor Name
            </label>
            <select
              id="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Donor</option>
              {donors.length > 0 ? (
                donors.map((donor) => (
                  <option key={donor._id} value={donor.name}>
                    {donor.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading donors...</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a thank-you message or feedback"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default FeedbackForm;
