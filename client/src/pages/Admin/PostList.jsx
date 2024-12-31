import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import axios from "axios"; // Import axios for making HTTP requests
import "./table.css";

const PostList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blood requests from the server
    const fetchBloodRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/blood-requests"
        );
        console.log("Fetched Blood Requests:", response.data); // Log fetched data
        setData(response.data); // Set fetched data into state
      } catch (error) {
        console.error("Error fetching blood requests:", error); // Log error details
        setError("Failed to fetch blood requests."); // Set error message
      }
    };

    fetchBloodRequests();
  }, []);

  // Handle delete request
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/blood-requests/${id}`);
      setData((prevData) => prevData.filter((request) => request._id !== id)); // Remove the deleted item from state
    } catch (error) {
      console.error("Error deleting blood request:", error);
      setError("Failed to delete the blood request.");
    }
  };

  return (
    <div>
      <Layout>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <h2>Blood Requests</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Address</th>
                  <th>Blood Type</th>
                  <th>Contact Info</th>
                  <th>Quantity</th>
                  <th>Urgency</th>
                  <th>Actions</th> {/* New Actions Column */}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((request) => (
                    <tr key={request._id}>
                      <td>{request.fullName}</td>
                      <td>{request.address}</td>
                      <td>{request.bloodType}</td>
                      <td>{request.contactInfo}</td>
                      <td>{request.quantity}</td>
                      <td>{request.urgency}</td>
                      <td>
                        {/* Delete Button */}
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(request._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No blood requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default PostList;
