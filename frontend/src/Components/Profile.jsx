import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../utils/constant.js";
import { setUser } from "../redux/UserSlice.js";

function Profile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "random",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    city: user?.city || "",
    country: user?.country || "",
    additionalInfo: user?.additionalInfo || "",
  });
  
  const [previewImage, setPreviewImage] = useState(null);

  // ✏️ Handle edit
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("profilePhoto", file);

    try {
      const res = await axios.put(`${BACKEND_URL}/user/upload-profile-photo`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = res.data.data.user;

      dispatch(setUser(updatedUser));
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile image");
    }
  };
  

  const handleSave = async () => {
    try {
      const res = await axios.put(`${BACKEND_URL}/user/update-profile`, formData, {
        withCredentials: true,
      });

      const updatedUser = res.data.data.user;

      // 🔁 Sync Redux
      dispatch(setUser(updatedUser));

      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setPreviewImage(null);
    setEditMode(false);
  };

  // 🧳 Dummy Trips
  const plannedTrips = [
    {
      id: 1,
      name: "Italy Getaway",
      destination: "Rome, Venice",
      date: "Mar 5 - Mar 15, 2025",
      image:
        "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h-300&fit=crop",
    },
    {
      id: 2,
      name: "Dubai Luxury Tour",
      destination: "Dubai, UAE",
      date: "Apr 1 - Apr 7, 2025",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    },
  ];

  const previousTrips = [
    {
      id: 3,
      name: "Paris Adventure",
      destination: "Paris, France",
      date: "Dec 15 - Dec 22, 2024",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Goa Friends Trip",
      destination: "Goa, India",
      date: "Nov 1 - Nov 6, 2024",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
    },
  ];

  // Default profile image URL
  const defaultProfileImage =
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face";

  return (
    <div className="profile-container">
      {/* 👤 Profile Card with Image */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <img
                src={user?.profilePhoto || defaultProfileImage}
                alt="Profile"
                className="profile-image"
              />

              {editMode && (
                <label className="image-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                  />
                  <span className="camera-icon">📷</span>
                </label>
              )}
            </div>
            {!editMode && (
              <div className="profile-status">
                <span className="status-indicator"></span>
                <span className="status-text">Active Traveler</span>
              </div>
            )}
          </div>

          <div className="profile-info">
            <h1>My Profile</h1>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{plannedTrips.length}</span>
                <span className="stat-label">Upcoming Trips</span>
              </div>
              <div className="stat">
                <span className="stat-number">{previousTrips.length}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">8</span>
                <span className="stat-label">Countries</span>
              </div>
            </div>
          </div>
        </div>

        {!editMode ? (
          <div className="profile-details">
            <div className="detail-item">
              <div className="detail-label">
                <span className="icon">👤</span>
                <strong>Name</strong>
              </div>
              <p>{user?.fullName}</p>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <span className="icon">✉️</span>
                <strong>Email</strong>
              </div>
              <p>{user?.email}</p>
            </div>

            <button
              className="btn edit-profile"
              onClick={() => setEditMode(true)}
            >
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <div className="edit-form">
            <div className="form-group">
              <label>
                <span className="icon">👤</span>
                Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>
                <span className="icon">✉️</span>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="profile-actions">
              <button className="btn save" onClick={handleSave}>
                💾 Save Changes
              </button>
              <button className="btn cancel" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🧳 Planned Trips */}
      <div className="trips-section">
        <div className="section-header">
          <h2>✈️ Planned Trips</h2>
          <span className="trip-count">{plannedTrips.length} trips</span>
        </div>
        <div className="trip-list">
          {plannedTrips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <div
                className="trip-image"
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>
              <div className="trip-content">
                <h3>{trip.name}</h3>
                <p className="destination">📍 {trip.destination}</p>
                <p className="date">📅 {trip.date}</p>
                <button className="trip-action-btn">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🕒 Previous Trips */}
      <div className="trips-section">
        <div className="section-header">
          <h2>🏆 Previous Trips</h2>
          <span className="trip-count">{previousTrips.length} trips</span>
        </div>
        <div className="trip-list">
          {previousTrips.map((trip) => (
            <div key={trip.id} className="trip-card completed">
              <div
                className="trip-image"
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>
              <div className="trip-content">
                <h3>{trip.name}</h3>
                <p className="destination">📍 {trip.destination}</p>
                <p className="date">📅 {trip.date}</p>
                <div className="trip-actions">
                  <button className="trip-action-btn">Relive Memories</button>
                  <button className="trip-action-btn outline">
                    Write Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔗 Navigate to Trips Page */}
      <div className="cta-section">
        <button className="view-all-btn" onClick={() => navigate("/trips")}>
          🗺️ View All Trips →
        </button>
        <p className="cta-text">
          Discover more adventures and plan your next journey!
        </p>
      </div>
    </div>
  );
}

export default Profile;
