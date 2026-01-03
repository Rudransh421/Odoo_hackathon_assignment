import React, { useState } from "react";
import "./CreateTrip.css";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    tripName: "",
    place: "",
    startDate: "",
    endDate: "",
  });

  // Destination based suggestions with images
  const placesByDestination = {
    paris: [
      {
        name: "Eiffel Tower",
        image:
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400",
      },
      {
        name: "Louvre Museum",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
      },
      {
        name: "Seine River Cruise",
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
      },
      {
        name: "Notre-Dame Cathedral",
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
      },
      {
        name: "Montmartre",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
      },
    ],
    tokyo: [
      {
        name: "Shibuya Crossing",
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400",
      },
      {
        name: "Tokyo Tower",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
      },
      {
        name: "Senso-ji Temple",
        image:
          "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400",
      },
      {
        name: "Akihabara",
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400",
      },
      {
        name: "Mount Fuji Day Trip",
        image:
          "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400",
      },
    ],
    india: [
      {
        name: "Taj Mahal",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400",
      },
      {
        name: "Jaipur City Palace",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400",
      },
      {
        name: "Kerala Backwaters",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400",
      },
      {
        name: "Goa Beaches",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400",
      },
      {
        name: "Varanasi Ghats",
        image:
          "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400",
      },
    ],
    london: [
      {
        name: "Big Ben",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
      },
      {
        name: "London Eye",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
      },
      {
        name: "Buckingham Palace",
        image:
          "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400",
      },
      {
        name: "Tower Bridge",
        image:
          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400",
      },
      {
        name: "British Museum",
        image:
          "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400",
      },
    ],
    newyork: [
      {
        name: "Statue of Liberty",
        image:
          "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400",
      },
      {
        name: "Times Square",
        image:
          "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400",
      },
      {
        name: "Central Park",
        image:
          "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400",
      },
      {
        name: "Brooklyn Bridge",
        image:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
      },
      {
        name: "Empire State Building",
        image:
          "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400",
      },
    ],
    default: [
      {
        name: "Famous Landmarks",
        image:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
      },
      {
        name: "Local Markets",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      },
      {
        name: "Historical Sites",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400",
      },
      {
        name: "Nature & Parks",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
      },
      {
        name: "Food Streets",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      },
    ],
  };

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  // Get suggestions dynamically
  const destinationKey = tripData.place.toLowerCase().replace(/\s+/g, "");
  const suggestedPlaces =
    placesByDestination[destinationKey] || placesByDestination.default;

  return (
    <div className="landing-container">
      <div className="main-wrapper">
        {/* Header */}
        <div className="app-header">
          <span className="app-name">GlobeTrotter</span>
          <div className="header-actions">
            <button
              className="back-btn"
              onClick={() =>
                step === 1 ? navigate("/landingpage") : setStep(1)
              }
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
            <span className="banner-icon">🧳</span>
            <span className="banner-text">Plan a New Trip</span>
          </div>
        </div>

        {/* STEP 1 - Trip Details */}
        {step === 1 && (
          <div className="trip-form-section">
            <h2 className="section-title">Trip Details</h2>

            <div className="form-container">
              <input
                type="text"
                name="tripName"
                placeholder="Trip Name (e.g., Summer Vacation 2025)"
                className="search-input"
                value={tripData.tripName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="place"
                placeholder="Destination (Paris, Tokyo, India, London, New York...)"
                className="search-input"
                value={tripData.place}
                onChange={handleChange}
              />

              <div className="date-row">
                <div className="date-field">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="search-input"
                    value={tripData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="date-field">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="search-input"
                    value={tripData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="plan-btn full-width"
                onClick={() => setStep(2)}
                disabled={!tripData.place || !tripData.tripName}
              >
                Next: Choose Places
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 - Places Selection */}
        {step === 2 && (
          <div className="regional-section">
            <h2 className="section-title">
              Places to Visit in {tripData.place}
              <span className="result-count">
                {" "}
                ({suggestedPlaces.length} suggestions)
              </span>
            </h2>

            <div className="regional-grid">
              {suggestedPlaces.map((place, index) => (
                <div key={index} className="region-card-image">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="region-img"
                  />
                  <div className="region-overlay">
                    <span className="region-name">{place.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button className="plan-btn secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="plan-btn"
                onClick={() => navigate("/itinerary", { state: { tripData } })}
              >
                Create Itinerary →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateTrip;
