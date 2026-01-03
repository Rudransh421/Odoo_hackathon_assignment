import React, { useState } from 'react';
import './Trips.css';

function Trips() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // 🔹 Dummy Trips Data
  // 🔹 Dummy Trips Data (EXPANDED)
  const trips = [
    {
      id: 1,
      name: 'Paris Adventure',
      destination: 'Paris, France',
      status: 'completed',
      startDate: '2024-12-15',
      endDate: '2024-12-22',
      overview: 'Visited Eiffel Tower, Louvre, Seine Cruise'
    },
    {
      id: 2,
      name: 'Tokyo Explorer',
      destination: 'Tokyo, Japan',
      status: 'ongoing',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
      overview: 'Shibuya, Mt Fuji, Anime district'
    },
    {
      id: 3,
      name: 'Italy Getaway',
      destination: 'Rome, Venice',
      status: 'upcoming',
      startDate: '2025-03-05',
      endDate: '2025-03-15',
      overview: 'Colosseum, Gondola ride, Vatican'
    },
    {
      id: 4,
      name: 'Kerala Nature Trip',
      destination: 'Kerala, India',
      status: 'completed',
      startDate: '2024-10-10',
      endDate: '2024-10-18',
      overview: 'Backwaters, houseboat stay, tea gardens'
    },
    {
      id: 5,
      name: 'Dubai Luxury Tour',
      destination: 'Dubai, UAE',
      status: 'upcoming',
      startDate: '2025-04-01',
      endDate: '2025-04-07',
      overview: 'Burj Khalifa, Desert Safari, Marina Cruise'
    },
    {
      id: 6,
      name: 'Himalayan Trek',
      destination: 'Himachal Pradesh, India',
      status: 'ongoing',
      startDate: '2025-01-05',
      endDate: '2025-01-20',
      overview: 'Snow trekking, camping, mountain views'
    },
    {
      id: 7,
      name: 'Thailand Beach Escape',
      destination: 'Phuket, Krabi',
      status: 'completed',
      startDate: '2024-09-12',
      endDate: '2024-09-20',
      overview: 'Island hopping, beaches, nightlife'
    },
    {
      id: 8,
      name: 'London City Break',
      destination: 'London, UK',
      status: 'upcoming',
      startDate: '2025-06-10',
      endDate: '2025-06-16',
      overview: 'Big Ben, London Eye, British Museum'
    },
    {
      id: 9,
      name: 'Goa Friends Trip',
      destination: 'Goa, India',
      status: 'completed',
      startDate: '2024-11-01',
      endDate: '2024-11-06',
      overview: 'Beaches, parties, water sports'
    }
  ];

  // 🔍 Search
  const searchedTrips = trips.filter(trip =>
    trip.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 Filter
  const filteredTrips = searchedTrips.filter(trip => {
    if (filter === 'all') return true;
    return trip.status === filter;
  });

  // 🔃 Sort
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.startDate) - new Date(a.startDate);
    }
    return a.name.localeCompare(b.name);
  });

  // 📂 Group by status
  const groupedTrips = {
    ongoing: [],
    upcoming: [],
    completed: []
  };

  sortedTrips.forEach(trip => {
    groupedTrips[trip.status].push(trip);
  });

  return (
    <div className="trips-container">
      <h1 className="page-title">My Trips</h1>

      {/* 🔍 Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search trips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* 📂 Trip Sections */}
      {['ongoing', 'upcoming', 'completed'].map(status => (
        groupedTrips[status].length > 0 && (
          <div key={status} className="trip-group">
            <h2 className={`group-title ${status}`}>
              {status.toUpperCase()}
            </h2>

            <div className="trip-grid">
              {groupedTrips[status].map(trip => (
                <div key={trip.id} className="trip-card">
                  <h3>{trip.name}</h3>
                  <p className="destination">{trip.destination}</p>
                  <p className="date">
                    {trip.startDate} → {trip.endDate}
                  </p>
                  <p className="overview">{trip.overview}</p>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default Trips;
