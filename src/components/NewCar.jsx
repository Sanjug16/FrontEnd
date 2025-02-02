
import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewCar.css';
import carLogo from "../images/car-logo.jpg";
import userIcon from "../images/user-icon.png";
// import { AuthContext } from '../App';

export function NewCar() {
  // const { setIsAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const ownerId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    carLocation: '',
    carPrice: '',
    totalNoOfOwners: ''
    // saleDecision: 1
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1900 || formData.year > currentYear) {
      newErrors.year = 'Please enter a valid year';
    }

    if (!formData.mileage) {
      newErrors.mileage = 'Mileage is required';
    } else if (formData.mileage < 0) {
      newErrors.mileage = 'Mileage cannot be negative';
    }

    if (!formData.carLocation) newErrors.carLocation = 'Location is required';
    
    if (!formData.carPrice) {
      newErrors.carPrice = 'Price is required';
    } else if (formData.carPrice <= 0) {
      newErrors.carPrice = 'Price must be greater than 0';
    }

    if (!formData.totalNoOfOwners) {
      newErrors.totalNoOfOwners = 'Number of owners is required';
    } else if (formData.totalNoOfOwners < 1) {
      newErrors.totalNoOfOwners = 'Number of owners must be at least 1';
    }

    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length === 0) {
    try {
      const formDataToSend = new FormData();

      // ✅ Ensure ownerId is included properly
      const updatedFormData = { ...formData, ownerId: ownerId };
      formDataToSend.append('data', JSON.stringify(updatedFormData));

      // ✅ Ensure "image" matches the backend parameter
      images.forEach((image) => {
        formDataToSend.append('image', image);
      });

      // ✅ Get token
      const token = localStorage.getItem('token');

      // ✅ Remove 'Content-Type' header
      const response = await axios.post(
        'http://localhost:6969/cars/addCarWithImage',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log("Response:", response.data);
      alert('Car added successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car. Please try again.');
    }
  } else {
    setErrors(newErrors);
  }
};
  // Add this function for logout
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  //   localStorage.removeItem('userToken');
  //   setIsAuthenticated(false);
  //   navigate('/home');
  // };

  return (
    <div className="newcar-container">
      <div className="new-car-card">
        <h1>Add New Car</h1>
        <form onSubmit={handleSubmit} className="newcar-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className={errors.make ? 'error' : ''}
                placeholder="Enter car make"
              />
              {errors.make && <span className="error-message">{errors.make}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={errors.model ? 'error' : ''}
                placeholder="Enter car model"
              />
              {errors.model && <span className="error-message">{errors.model}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={errors.year ? 'error' : ''}
                  placeholder="Enter year"
                />
                {errors.year && <span className="error-message">{errors.year}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="mileage">Mileage (km)</label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className={errors.mileage ? 'error' : ''}
                  placeholder="Enter mileage"
                />
                {errors.mileage && <span className="newcar-error">{errors.mileage}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="carLocation">Location</label>
              <input
                type="text"
                id="carLocation"
                name="carLocation"
                value={formData.carLocation}
                onChange={handleChange}
                className={errors.carLocation ? 'error' : ''}
                placeholder="Enter location"
              />
              {errors.carLocation && <span className="error-message">{errors.carLocation}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="carPrice">Price ($)</label>
                <input
                  type="number"
                  id="carPrice"
                  name="carPrice"
                  value={formData.carPrice}
                  onChange={handleChange}
                  className={errors.carPrice ? 'error' : ''}
                  placeholder="Enter price"
                />
                {errors.carPrice && <span className="error-message">{errors.carPrice}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="totalNoOfOwners">Total Number of Owners</label>
                <input
                  type="number"
                  id="totalNoOfOwners"
                  name="totalNoOfOwners"
                  value={formData.totalNoOfOwners}
                  onChange={handleChange}
                  className={errors.totalNoOfOwners ? 'error' : ''}
                  placeholder="Enter number of owners"
                />
                {errors.totalNoOfOwners && <span className="error-message">{errors.totalNoOfOwners}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="images">Car Images</label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className={errors.images ? 'error' : ''}
              />
              {errors.images && <span className="error-message">{errors.images}</span>}
              <div className="newcar-image-preview">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className='submit-button'>
              Add Car
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 