import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Activities.css';

function Activities() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityList, setActivityList] = useState([
    { id: 1, name: 'Morning Walk Tour', description: 'Walk through city streets in morning', cost: 500, duration: '2h', category: 'Leisure' },
    { id: 2, name: 'Local Sightseeing', description: 'Visit popular spots', cost: 1200, duration: '4h', category: 'Sightseeing' },
    { id: 3, name: 'Cycling Adventure', description: 'Cycling through trails', cost: 800, duration: '3h', category: 'Adventure' },
    { id: 4, name: 'Museum Visit', description: 'Explore museums and galleries', cost: 700, duration: '2h', category: 'Education' }
  ]);

  const filteredActivities = activityList.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const addActivity = () => {
    if (!activityName) return;
    const newActivity = {
      id: activityList.length + 1,
      name: activityName,
      description: 'No description yet',
      cost: 0,
      duration: '1h',
      category: 'General'
    };
    setActivityList([...activityList, newActivity]);
    setActivityName('');
    alert('Activity added!');
  };

  return (
    <div className="activities-container">
      <h2 className="page-title">Activity Explorer</h2>

      {/* Search Input */}
      <div className="activity-search">
        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Activity List */}
      <div className="activity-grid">
        {filteredActivities.map(act => (
          <div key={act.id} className="activity-card">
            <h3>{act.name}</h3>
            <p><strong>Category:</strong> {act.category}</p>
            <p><strong>Duration:</strong> {act.duration}</p>
            <p><strong>Cost:</strong> ₹{act.cost}</p>
            <p className="description">{act.description}</p>
            <button
                onClick={() =>
                    navigate('/itinerary', {
                    state: { activity: act } // Pass selected activity
                    })
                }
                >
                Add to Itinerary
                </button>
          </div>
        ))}
      </div>

      {/* Add New Activity */}
      <div className="add-activity">
        <h3>Can't find your activity? Add a new one!</h3>
        <input
          type="text"
          placeholder="Activity name"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <button onClick={addActivity}>Add Activity</button>
      </div>
    </div>
  );
}

export default Activities;
