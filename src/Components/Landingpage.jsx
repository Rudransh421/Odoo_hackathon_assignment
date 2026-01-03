import React, { useState } from 'react'
import './Landingpage.css'
import { useNavigate } from 'react-router-dom'

function Landingpage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [groupBy, setGroupBy] = useState('none')
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showAll, setShowAll] = useState(false)

  const allRegionalSelections = [
    { id: 1, name: 'Europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400', className: 'europe', continent: 'Europe', popularity: 95 },
    { id: 2, name: 'Asia', image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400', className: 'asia', continent: 'Asia', popularity: 92 },
    { id: 3, name: 'Americas', image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=400', className: 'americas', continent: 'Americas', popularity: 88 },
    { id: 4, name: 'Africa', image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400', className: 'africa', continent: 'Africa', popularity: 78 },
    { id: 5, name: 'Oceania', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', className: 'oceania', continent: 'Oceania', popularity: 85 },
    { id: 6, name: 'Caribbean', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', className: 'americas', continent: 'Americas', popularity: 90 },
    { id: 7, name: 'Middle East', image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400', className: 'asia', continent: 'Asia', popularity: 82 },
    { id: 8, name: 'Scandinavia', image: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400', className: 'oceania', continent: 'Europe', popularity: 87 },
    { id: 9, name: 'South America', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400', className: 'americas', continent: 'Americas', popularity: 84 },
    { id: 10, name: 'Southeast Asia', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400', className: 'asia', continent: 'Asia', popularity: 93 },
    { id: 11, name: 'Mediterranean', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400', className: 'europe', continent: 'Europe', popularity: 91 },
    { id: 12, name: 'North Africa', image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400', className: 'africa', continent: 'Africa', popularity: 79 }
  ]

  const previousTrips = [
    { 
      id: 1, 
      title: 'Paris Adventure', 
      destination: 'Paris, France',
      date: 'Dec 15-22, 2024',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
      className: 'paris'
    },
    { 
      id: 2, 
      title: 'Tokyo Explorer', 
      destination: 'Tokyo, Japan',
      date: 'Nov 5-12, 2024',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      className: 'tokyo'
    },
    { 
      id: 3, 
      title: 'NYC Getaway', 
      destination: 'New York, USA',
      date: 'Oct 20-27, 2024',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
      className: 'nyc'
    }
  ]

  // Filter regions based on search
  const filteredRegions = allRegionalSelections.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Apply filter
  const filterApplied = filteredRegions.filter(region => {
    if (filterBy === 'all') return true
    if (filterBy === 'popular') return region.popularity >= 85
    if (filterBy === 'trending') return region.popularity >= 90
    return true
  })

  // Apply sorting
  const sortedRegions = [...filterApplied].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'popularity') return b.popularity - a.popularity
    return 0
  })

  // Limit displayed regions
  const displayedRegions = showAll ? sortedRegions : sortedRegions.slice(0, 8)

  // Group regions
  const groupedRegions = {}
  if (groupBy === 'continent') {
    displayedRegions.forEach(region => {
      if (!groupedRegions[region.continent]) {
        groupedRegions[region.continent] = []
      }
      groupedRegions[region.continent].push(region)
    })
  } else {
    groupedRegions['All Regions'] = displayedRegions
  }

  return (
    <div className="landing-container">
      <div className="main-wrapper">
        {/* App Header */}
        <div className="app-header">
          <span className="app-name">GlobeTrotter</span>
          <div className="header-actions">
            <button 
              className="profile-btn"
              onClick={() => navigate('/profile')}
              title="Profile"
            >
              👤
            </button>
            <button className="settings-btn" title="Settings">
              ⚙
            </button>
          </div>
        </div>

        {/* Banner */}
        <div className="banner">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-icon">✈️</span>
            <span className="banner-text">Explore the World</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="search-buttons">
            <select 
              className="action-btn"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="none">Group by</option>
              <option value="continent">Continent</option>
              <option value="none">None</option>
            </select>
            
            <select 
              className="action-btn"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">Filter</option>
              <option value="all">All</option>
              <option value="popular">Popular (85+)</option>
              <option value="trending">Trending (90+)</option>
            </select>
            
            <select 
              className="action-btn"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by</option>
              <option value="name">Name</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Regional Selections */}
        <div className="regional-section">
          <h2 className="section-title">
            Top Regional Selections 
            <span className="result-count"> ({sortedRegions.length} destinations)</span>
          </h2>
          
          {Object.keys(groupedRegions).map(groupName => (
            <div key={groupName} className="region-group">
              {groupBy !== 'none' && (
                <h3 className="group-title">{groupName}</h3>
              )}
              <div className="regional-grid">
                {groupedRegions[groupName].map((region) => (
                  <div
                    key={region.id}
                    className="region-card-image"
                  >
                    <img src={region.image} alt={region.name} className="region-img" />
                    <div className="region-overlay">
                      <span className="region-name">{region.name}</span>
                      <span className="region-popularity">{region.popularity}% popular</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {sortedRegions.length === 0 && (
            <div className="no-results">
              <p>No destinations found matching "{searchQuery}"</p>
            </div>
          )}

          {/* Show More/Less Button */}
          {sortedRegions.length > 8 && (
            <div className="show-more-container">
              <button 
                className="show-more-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `Show More (${sortedRegions.length - 8} more)`}
              </button>
            </div>
          )}
        </div>

        {/* Previous Trips */}
        <div className="trips-section">
          <h2 className="section-title">Previous Trips</h2>
          <div className="trips-grid">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className="trip-card-image"
              >
                <img src={trip.image} alt={trip.title} className="trip-img" />
                <div className="trip-overlay">
                  <h3 className="trip-title">{trip.title}</h3>
                  <p className="trip-destination">{trip.destination}</p>
                  <p className="trip-date">{trip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Trip Buttons */}
        <div className="plan-btn-group">
          <button className="plan-btn" onClick={() => navigate('/createtrip')}>
            <span className="plan-icon">+</span>
            <span>Plan a trip</span>
          </button>
          <button className="plan-btn" onClick={() => navigate('/community')}>
            <span>Community</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Landingpage