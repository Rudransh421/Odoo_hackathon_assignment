import React, { useState } from 'react'
import './CreateTrip.css'
import { useNavigate } from 'react-router-dom';
function CreateTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1)
  const [tripData, setTripData] = useState({
    tripName: '',
    place: '',
    startDate: '',
    endDate: ''
  })

  // 🔹 Destination based suggestions
  const placesByDestination = {
    paris: [
      'Eiffel Tower',
      'Louvre Museum',
      'Seine River Cruise',
      'Notre-Dame Cathedral',
      'Montmartre'
    ],
    tokyo: [
      'Shibuya Crossing',
      'Tokyo Tower',
      'Senso-ji Temple',
      'Akihabara',
      'Mount Fuji Day Trip'
    ],
    india: [
      'Taj Mahal',
      'Jaipur City Palace',
      'Kerala Backwaters',
      'Goa Beaches',
      'Varanasi Ghats'
    ],
    london: [
      'Big Ben',
      'London Eye',
      'Buckingham Palace',
      'Tower Bridge',
      'British Museum'
    ],
    default: [
      'Famous Landmarks',
      'Local Markets',
      'Historical Sites',
      'Nature & Parks',
      'Food Streets'
    ]
  }

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value })
  }

  // 🔹 Get suggestions dynamically
  const destinationKey = tripData.place.toLowerCase()
  const suggestedPlaces =
    placesByDestination[destinationKey] ||
    placesByDestination.default

  return (
    <div className="landing-container">
      <div className="main-wrapper">

        {/* Header */}
        <div className="app-header">
          <span className="app-name">GlobalTrotter</span>
          <button className="settings-btn">
            <span>⚙</span>
          </button>
        </div>

        {/* Banner */}
        <div className="banner">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-icon">🧳</span>
            <span className="banner-text">Plan a New Trip</span>
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="trip-form-section">
            <h2 className="section-title">Trip Details</h2>

            <input
              type="text"
              name="tripName"
              placeholder="Trip Name"
              className="search-input"
              value={tripData.tripName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="place"
              placeholder="Destination (Paris, Tokyo, India...)"
              className="search-input"
              value={tripData.place}
              onChange={handleChange}
            />

            <div className="date-row">
              <input
                type="date"
                name="startDate"
                className="search-input"
                value={tripData.startDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name="endDate"
                className="search-input"
                value={tripData.endDate}
                onChange={handleChange}
              />
            </div>

            <button
              className="plan-btn"
              onClick={() => setStep(2)}
              disabled={!tripData.place}
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="regional-section">
            <h2 className="section-title">
              Places to Visit in {tripData.place}
            </h2>

            <div className="regional-grid">
              {suggestedPlaces.map((place, index) => (
                <div key={index} className="region-card europe">
                  <span className="region-icon">📍</span>
                  <span className="region-name">{place}</span>
                </div>
              ))}
            </div>

            <button
              className="plan-btn"
              onClick={() => navigate('/itinerary', { state: { tripData } })}
            >
              Finish
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default CreateTrip
