import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios for making HTTP requests
import DonorList from "../components/DonorList";
import RequestBlood from "../components/RequestBlood";
import BloodRequestsList from "../components/BloodRequestsList";

function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const [donors, setDonors] = useState([]);

  // Fetch donors from the backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("/get-donars", {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Assuming the token is stored in the user object
          },
        });
        setDonors(response.data.donors); // Assuming the backend sends the donors in this format
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      }
    };

    if (user) {
      fetchDonors();
    }
  }, [user]);

  // Redirect based on user role
  const navigateTo = () => {
    if (user?.role === "organisation") {
      return <Navigate to={"/inventory"} />;
    } else if (user?.role === "hospital" || user?.role === "donor") {
      return <Navigate to={"/organisation"} />;
    } else if (user?.role === "admin") {
      return <Navigate to={"/donor-list"} />;
    }
  };

  // Show the home screen if no navigation is needed
  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl text-red-700 font-bold mb-6">
            Welcome to Blood Bank Management
          </h1>
          <p className="text-xl mb-12">
            Ensuring safe blood for everyone, everywhere.
          </p>
          <div className="space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Donate Blood
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
              Request Blood
            </button>
          </div>
          <DonorList />
          <RequestBlood />
          <BloodRequestsList />
        </div>
      </>
    );
  }

  // Display donors in a grid if user is logged in
  return (
    <>
      {navigateTo()}
      <div className="grid grid-cols-4 gap-4 p-4">
        {donors.map((donor) => (
          <div key={donor.id} className="p-4 border rounded shadow-lg">
            <h3 className="text-lg font-bold">{donor.name}</h3>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Location: {donor.location}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
