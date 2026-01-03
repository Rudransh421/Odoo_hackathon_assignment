import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Activities.css";

function Activities() {
  const navigate = useNavigate();
  const location = useLocation();
  const tripData = location.state?.tripData;

  const [search, setSearch] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityList, setActivityList] = useState([
    {
      id: 1,
      name: "Morning Walk Tour",
      description: "Walk through city streets in morning",
      cost: 500,
      duration: "2h",
      category: "Leisure",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
    },
    {
      id: 2,
      name: "Local Sightseeing",
      description: "Visit popular spots and landmarks",
      cost: 1200,
      duration: "4h",
      category: "Sightseeing",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    },
    {
      id: 3,
      name: "Cycling Adventure",
      description: "Cycling through scenic trails",
      cost: 800,
      duration: "3h",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    },
    {
      id: 4,
      name: "Museum Visit",
      description: "Explore museums and art galleries",
      cost: 700,
      duration: "2h",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400",
    },
    {
      id: 5,
      name: "Food Street Tour",
      description: "Taste local cuisine and street food",
      cost: 600,
      duration: "3h",
      category: "Food",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    },
    {
      id: 6,
      name: "Beach Relaxation",
      description: "Relax at the beach and enjoy water activities",
      cost: 400,
      duration: "4h",
      category: "Leisure",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    },
    {
      id: 7,
      name: "Mountain Hiking",
      description: "Hike through mountain trails",
      cost: 1500,
      duration: "5h",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
    },
    {
      id: 8,
      name: "Shopping Tour",
      description: "Explore local markets and shopping areas",
      cost: 300,
      duration: "2h",
      category: "Shopping",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Leisure",
    "Sightseeing",
    "Adventure",
    "Education",
    "Food",
    "Shopping",
  ];

  const filteredActivities = activityList.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addActivity = () => {
    if (!activityName.trim()) {
      alert("Please enter activity name");
      return;
    }
    const newActivity = {
      id: activityList.length + 1,
      name: activityName,
      description: "Custom activity added by user",
      cost: 500,
      duration: "2h",
      category: "General",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
    };
    setActivityList([...activityList, newActivity]);
    setActivityName("");
    alert("Activity added successfully!");
  };

  return (
    <div className="landing-container">
      <div className="main-wrapper">
        {/* Header */}
        <div className="app-header">
          <span className="app-name">GlobeTrotter</span>
          <div className="header-actions">
            <button
              className="back-btn"
              onClick={() => navigate("/itinerary", { state: { tripData } })}
            >
              ← Back
            </button>
            <button className="settings-btn">
              <span>⚙</span>
            </button>
          </div>
        </div>

        {/* Banner */}
        <div className="banner">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-icon">🎯</span>
            <span className="banner-text">Activity Explorer</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="search-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`action-btn ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Grid */}
        <div className="regional-section">
          <h2 className="section-title">
            Available Activities
            <span className="result-count">
              {" "}
              ({filteredActivities.length} found)
            </span>
          </h2>

          <div className="regional-grid activities-grid">
            {filteredActivities.map((act) => (
              <div key={act.id} className="activity-card-image">
                <img src={act.image} alt={act.name} className="region-img" />
                <div className="activity-overlay">
                  <h3 className="activity-title">{act.name}</h3>
                  <p className="activity-description">{act.description}</p>
                  <div className="activity-details">
                    <span className="activity-badge">{act.category}</span>
                    <span className="activity-duration">⏱️ {act.duration}</span>
                  </div>
                  <div className="activity-footer">
                    <span className="activity-cost">₹{act.cost}</span>
                    <button
                      className="add-activity-btn"
                      onClick={() =>
                        navigate("/itinerary", {
                          state: { tripData, activity: act },
                        })
                      }
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="no-results">
              <p>No activities found. Try a different search or category!</p>
            </div>
          )}
        </div>

        {/* Add Custom Activity */}
        <div className="trip-form-section">
          <h2 className="section-title">
            Can't find your activity? Add a custom one!
          </h2>
          <div className="form-container">
            <div className="budget-input-group">
              <input
                type="text"
                placeholder="Activity name (e.g., Sunset Photography)"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                className="search-input"
              />
              <button
                className="plan-btn"
                onClick={addActivity}
                disabled={!activityName.trim()}
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
