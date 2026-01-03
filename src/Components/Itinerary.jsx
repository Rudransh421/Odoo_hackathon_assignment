import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Itinerary.css'

function Itinerary() {
  const navigate = useNavigate()
  const location = useLocation()
  const tripData = location.state?.tripData

  const [totalBudget, setTotalBudget] = useState('')
  const [dayPlans, setDayPlans] = useState([])

  useEffect(() => {
    // Redirect if no trip data
    if (!tripData) {
      navigate('/createtrip')
    }
  }, [tripData, navigate])

  const generatePlan = () => {
    if (!totalBudget) {
      alert('Please enter your total budget')
      return
    }

    const start = new Date(tripData.startDate)
    const end = new Date(tripData.endDate)
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1

    if (totalDays <= 0) {
      alert('Invalid date range')
      return
    }

    const perDayBudget = Math.floor(totalBudget / totalDays)

    const activityTemplates = [
      { name: 'Morning Walk Tour', ratio: 0.25 },
      { name: 'Local Sightseeing', ratio: 0.35 },
      { name: 'Adventure Activity', ratio: 0.25 },
      { name: 'Evening Leisure', ratio: 0.15 }
    ]

    const plans = []

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(start)
      currentDate.setDate(start.getDate() + i)

      const activities = activityTemplates.map(act => ({
        activity: act.name,
        expense: Math.floor(perDayBudget * act.ratio)
      }))

      plans.push({
        day: i + 1,
        date: currentDate.toISOString().split('T')[0],
        activities
      })
    }

    setDayPlans(plans)
  }

  if (!tripData) {
    return null
  }

  const totalDays = tripData.startDate && tripData.endDate 
    ? Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24)) + 1 
    : 0

  return (
    <div className="landing-container">
      <div className="main-wrapper">

        {/* Header */}
        <div className="app-header">
          <span className="app-name">GlobalTrotter</span>
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={() => navigate('/createtrip')}
            >
              ← Back
            </button>
            <button className="settings-btn">
              <span>⚙</span>
            </button>
          </div>
        </div>

        {/* Banner */}
         

        {/* Trip Summary */}
        <div className="trip-summary-section">
          <h2 className="section-title">Trip Summary</h2>
          <div className="summary-card">
            <div className="summary-item">
              <span className="summary-label">Trip Name:</span>
              <span className="summary-value">{tripData.tripName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Destination:</span>
              <span className="summary-value">{tripData.place}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Duration:</span>
              <span className="summary-value">
                {tripData.startDate} to {tripData.endDate} ({totalDays} days)
              </span>
            </div>
          </div>
        </div>

        {/* Budget Input */}
        <div className="trip-form-section">
          <h2 className="section-title">Set Your Budget</h2>
          <div className="form-container">
            <div className="budget-input-group">
              <input
                type="number"
                placeholder="Enter Total Budget (₹)"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                className="search-input"
              />
              <button 
                className="plan-btn"
                onClick={generatePlan}
                disabled={!totalBudget}
              >
                Generate Itinerary
              </button>
            </div>
            
            {totalBudget && totalDays > 0 && (
              <div className="budget-info">
                <p>Per Day Budget: ₹{Math.floor(totalBudget / totalDays)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Explore Activities Button */}
        <div className="explore-section">
          <button
            className="plan-btn secondary full-width"
            onClick={() => navigate('/activities', { state: { tripData } })}
          >
            🎯 Explore Activities
          </button>
        </div>

        {/* Day Plans */}
        {dayPlans.length > 0 && (
          <div className="regional-section">
            <h2 className="section-title">
              Day-by-Day Itinerary
              <span className="result-count"> ({dayPlans.length} days)</span>
            </h2>

            <div className="day-plans-container">
              {dayPlans.map(day => (
                <div key={day.day} className="day-card">
                  <div className="day-header">
                    <h3>Day {day.day}</h3>
                    <span className="day-date">{day.date}</span>
                  </div>

                  <div className="activity-list">
                    {day.activities.map((act, index) => (
                      <div key={index} className="activity-row">
                        <div className="activity-info">
                          <span className="activity-icon">
                            {index === 0 ? '🌅' : index === 1 ? '🗺️' : index === 2 ? '🎢' : '🌆'}
                          </span>
                          <span className="activity-name">{act.activity}</span>
                        </div>
                        <span className="activity-expense">₹{act.expense}</span>
                      </div>
                    ))}
                  </div>

                  <div className="day-total">
                    <span>Day Total:</span>
                    <span className="total-amount">
                      ₹{day.activities.reduce((sum, a) => sum + a.expense, 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="grand-total-card">
              <span>Total Trip Cost:</span>
              <span className="grand-total-amount">₹{totalBudget}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Itinerary