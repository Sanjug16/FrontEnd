import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  // Assuming cars data will come from an API/state management
  // For now using dummy data - replace this with actual data
  const userCars = []; // Empty array for testing "no cars" scenario
  
  const handleAddCar = () => {
    navigate('/addcar'); // Create this route and component
  };

  return (
    <div className="profile-container">
        <div className="header-row">
        <button 
          className="home-button"
          onClick={() => navigate('/dashboard')}
        >
          <img 
            src="https://png.pngtree.com/png-clipart/20210523/original/pngtree-home-button-ui-ux-png-image_6322239.jpg"
            alt="Home"
          />
        </button>
        <h1 className="profile-title">My Profile</h1>
      </div>
      <div className="profile-header">
        <div className="profile-image-container">
          <img 
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" 
            alt="Profile"
            className="profile-image"
          />
        </div>
        <h2 className="username">{username}</h2>
      </div>

      <div className="my-cars-section">
        <h3>My Cars</h3>
        
        {userCars.length === 0 ? (
          <div className="no-cars-message">
            <p>You have not added your vehicle yet, Add your car.</p>
            <button className="add-car-button" onClick={handleAddCar}>
              Click here to Add your car
            </button>
          </div>
        ) : (
          <>
            <div className="cars-grid">
              {userCars.map((car) => (
                <div key={car.id} className="car-card">
                  <div className="car-image">
                    <img src={car.image} alt={car.model} />
                  </div>
                  <div className="car-details">
                    <h4>{car.model}</h4>
                    <p>Year: {car.year}</p>
                    <p>License: {car.license}</p>
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
