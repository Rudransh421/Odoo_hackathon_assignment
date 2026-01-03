import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Itinerary.css';

function Itinerary() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [dayPlans, setDayPlans] = useState([]);

  const generatePlan = () => {
    if (!startDate || !endDate || !totalBudget) {
      alert('Please fill all fields');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (totalDays <= 0) {
      alert('Invalid date range');
      return;
    }

    const perDayBudget = Math.floor(totalBudget / totalDays);

    const activityTemplates = [
      { name: 'Morning Walk Tour', ratio: 0.25 },
      { name: 'Local Sightseeing', ratio: 0.35 },
      { name: 'Adventure Activity', ratio: 0.25 },
      { name: 'Evening Leisure', ratio: 0.15 }
    ];

    const plans = [];

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      const activities = activityTemplates.map(act => ({
        activity: act.name,
        expense: Math.floor(perDayBudget * act.ratio)
      }));

      plans.push({
        day: i + 1,
        date: currentDate.toISOString().split('T')[0],
        activities
      });
    }

    setDayPlans(plans);
  };

  return (
    <div className="itinerary-container">
      <h2 className="page-title">Trip Itinerary Planner</h2>

      {/* DATE & BUDGET INPUT */}
      <div className="input-card">
        <input type="date" value={startDate}
          onChange={(e) => setStartDate(e.target.value)} />

        <input type="date" value={endDate}
          onChange={(e) => setEndDate(e.target.value)} />

        <input type="number" placeholder="Total Budget ₹"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)} />

        <button onClick={generatePlan}>
          Generate Itinerary
        </button>
      </div>

      {/* BUTTON TO NAVIGATE TO ACTIVITIES */}
      <div className="activities-btn-container">
        <button
          className="navigate-activities-btn"
          onClick={() => navigate('/activities')}
        >
          Explore Activities
        </button>
      </div>

      {/* DAY WISE LONG VIEW */}
      {dayPlans.length > 0 && (
        <div className="day-plan-section">
          {dayPlans.map(day => (
            <div key={day.day} className="day-card">
              <h3>Day {day.day}</h3>
              <p className="date">{day.date}</p>

              <div className="activity-list">
                {day.activities.map((act, index) => (
                  <div key={index} className="activity-row">
                    <span>{act.activity}</span>
                    <span className="expense">₹ {act.expense}</span>
                  </div>
                ))}
              </div>

              <div className="day-total">
                Day Total: ₹{' '}
                {day.activities.reduce((sum, a) => sum + a.expense, 0)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Itinerary;
