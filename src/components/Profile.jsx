import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userCars, setUserCars] = useState([]); // Store fetched cars
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const ownerId = localStorage.getItem("userId"); // Get ownerId from localStorage

    if (ownerId) {
      fetchUserCars(ownerId); // Fetch user's cars
    } else {
      setLoading(false);
      setError("User ID not found in local storage.");
    }
  }, []);

  const fetchUserCars = async (ownerId) => {
    try {
      const token = localStorage.getItem("token"); // Assuming authentication token is required
      const response = await axios.get(`http://localhost:6969/cars/owner/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include auth token if required
        },
      });

      setUserCars(response.data); // Store fetched cars
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to fetch cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle car selling
  const handleSell = async (carId) => {
    try {
      const token = localStorage.getItem("token");
      const carToSell = userCars.find(car => car.carId === carId);
      if (!carToSell) {
        alert("Car not found");
        return;
      }

      // Create a new object with status updated to "AVAILABLE"
      const updatedCar = { ...carToSell, status: "AVAILABLE" };

      await axios.put(`http://localhost:6969/cars/updateCar`, updatedCar, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the car list after successful update
      fetchUserCars(localStorage.getItem("userId"));
    } catch (error) {
      console.error("Error updating car status:", error);
      alert("Failed to update car status. Please try again.");
    }
  };

    // Function to handle car selling
    const handleRemoveSale = async (carId) => {
      try {
        const token = localStorage.getItem("token");
        const carToSell = userCars.find(car => car.carId === carId);
        if (!carToSell) {
          alert("Car not found");
          return;
        }
  
        // Create a new object with status updated to "AVAILABLE"
        const updatedCar = { ...carToSell, status: "OWNED" };
  
        await axios.put(`http://localhost:6969/cars/updateCar`, updatedCar, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Refresh the car list after successful update
        fetchUserCars(localStorage.getItem("userId"));
      } catch (error) {
        console.error("Error updating car status:", error);
        alert("Failed to update car status. Please try again.");
      }
    };

  const handleAddCar = () => {
    navigate("/addcar"); // Navigate to add car page
  };

  return (
    <div className="profile-container">
      <div className="header-row">
        <button className="home-button" onClick={() => navigate("/dashboard")}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfpNB6hq99Xn95VrfLS8BAfkWEaGxuUvYJrQ&s"
            alt="Home"
          />
        </button>
        <h1 className="profile-title">My Profile</h1>
      </div>

      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&s"
            alt="Profile"
            className="profile-image"
          />
        </div>
        <h2 className="username">{username}</h2>
      </div>

      <div className="my-cars-section">
        <h3>My Cars</h3>

        {loading ? (
          <p>Loading cars...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : userCars.length === 0 ? (
          <div className="no-cars-message">
            <p>You have not added your vehicle yet. Add your car.</p>
            <button className="add-car-button" onClick={handleAddCar}>
              Click here to Add your car
            </button>
          </div>
        ) : (
          <>
            <div className="cars-grid">
              {userCars.map((car) => (
                <div key={car.carId} className="car-card">
                  <div className="car-image">
                    <img
                      src={car.carImageUrls?.[0] || "https://via.placeholder.com/150"} // Use first image or a placeholder
                      alt={car.model}
                    />
                  </div>
                  <div className="car-details">
                    <h4>{car.make} {car.model}</h4>
                    <p>Year: {car.year}</p>
                    <p>Mileage: {car.mileage} km</p>
                    <p>Location: {car.carLocation}</p>
                    <p>Status: {car.status}</p>
                    <div className = "sale-buttons">
                    <button className="service-button" onClick={() => handleService(car.carId)}>Service</button>
                    <button className="sell-button" onClick={() => handleSell(car.carId)}>Sell</button>
                    <button className="remove-sale-button" onClick={() =>handleRemoveSale(car.carId)}>Remove from sale</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-another-car-button" onClick={handleAddCar}>
              Add Another Car
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
