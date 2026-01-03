import React, { useState } from 'react'
import './Landingpage.css'
import { useNavigate } from 'react-router-dom'
function Landingpage() {
    const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [groupBy, setGroupBy] = useState('none')
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const allRegionalSelections = [
    { id: 1, name: 'Europe', icon: '🇪🇺', className: 'europe', continent: 'Europe', popularity: 95 },
    { id: 2, name: 'Asia', icon: '🌏', className: 'asia', continent: 'Asia', popularity: 92 },
    { id: 3, name: 'Americas', icon: '🌎', className: 'americas', continent: 'Americas', popularity: 88 },
    { id: 4, name: 'Africa', icon: '🌍', className: 'africa', continent: 'Africa', popularity: 78 },
    { id: 5, name: 'Oceania', icon: '🏝️', className: 'oceania', continent: 'Oceania', popularity: 85 },
    { id: 6, name: 'Caribbean', icon: '🏖️', className: 'americas', continent: 'Americas', popularity: 90 },
    { id: 7, name: 'Middle East', icon: '🕌', className: 'asia', continent: 'Asia', popularity: 82 },
    { id: 8, name: 'Scandinavia', icon: '❄️', className: 'oceania', continent: 'Europe', popularity: 87 },
    { id: 9, name: 'South America', icon: '🦜', className: 'americas', continent: 'Americas', popularity: 84 },
    { id: 10, name: 'Southeast Asia', icon: '🌴', className: 'asia', continent: 'Asia', popularity: 93 },
    { id: 11, name: 'Mediterranean', icon: '🌊', className: 'europe', continent: 'Europe', popularity: 91 },
    { id: 12, name: 'North Africa', icon: '🐪', className: 'africa', continent: 'Africa', popularity: 79 },
    { id: 13, name: 'Eastern Europe', icon: '🏰', className: 'europe', continent: 'Europe', popularity: 86 },
    { id: 14, name: 'Central America', icon: '🌋', className: 'americas', continent: 'Americas', popularity: 81 },
    { id: 15, name: 'East Asia', icon: '🎎', className: 'asia', continent: 'Asia', popularity: 94 },
    { id: 16, name: 'Pacific Islands', icon: '🌺', className: 'oceania', continent: 'Oceania', popularity: 88 },
    { id: 17, name: 'Western Europe', icon: '🗼', className: 'europe', continent: 'Europe', popularity: 96 },
    { id: 18, name: 'South Asia', icon: '🐘', className: 'asia', continent: 'Asia', popularity: 83 },
    { id: 19, name: 'Sub-Saharan Africa', icon: '🦁', className: 'africa', continent: 'Africa', popularity: 76 },
    { id: 20, name: 'North America', icon: '🦅', className: 'americas', continent: 'Americas', popularity: 89 },
    { id: 21, name: 'Australia & NZ', icon: '🦘', className: 'oceania', continent: 'Oceania', popularity: 92 },
    { id: 22, name: 'British Isles', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', className: 'europe', continent: 'Europe', popularity: 90 },
    { id: 23, name: 'Arabian Peninsula', icon: '🏜️', className: 'asia', continent: 'Asia', popularity: 80 },
    { id: 24, name: 'Central Asia', icon: '🏔️', className: 'asia', continent: 'Asia', popularity: 77 },
    { id: 25, name: 'Balkans', icon: '⛰️', className: 'europe', continent: 'Europe', popularity: 84 },
    { id: 26, name: 'East Africa', icon: '🦒', className: 'africa', continent: 'Africa', popularity: 81 },
    { id: 27, name: 'Southern Africa', icon: '🌍', className: 'africa', continent: 'Africa', popularity: 82 },
    { id: 28, name: 'Polynesia', icon: '🏄', className: 'oceania', continent: 'Oceania', popularity: 87 },
    { id: 29, name: 'Alpine Region', icon: '⛷️', className: 'europe', continent: 'Europe', popularity: 89 },
    { id: 30, name: 'Patagonia', icon: '🏔️', className: 'americas', continent: 'Americas', popularity: 85 },
    { id: 31, name: 'Amazon Region', icon: '🌳', className: 'americas', continent: 'Americas', popularity: 80 },
    { id: 32, name: 'Himalayas', icon: '🏔️', className: 'asia', continent: 'Asia', popularity: 86 },
    { id: 33, name: 'Iberian Peninsula', icon: '🎭', className: 'europe', continent: 'Europe', popularity: 93 },
    { id: 34, name: 'Indochina', icon: '🛕', className: 'asia', continent: 'Asia', popularity: 91 },
    { id: 35, name: 'Melanesia', icon: '🌴', className: 'oceania', continent: 'Oceania', popularity: 79 },
    { id: 36, name: 'Nordic Countries', icon: '🇳🇴', className: 'europe', continent: 'Europe', popularity: 88 }
  ]

  const previousTrips = [
    { 
      id: 1, 
      title: 'Paris Adventure', 
      destination: 'Paris, France',
      date: 'Dec 15-22, 2024',
      icon: '🗼',
      className: 'paris'
    },
    { 
      id: 2, 
      title: 'Tokyo Explorer', 
      destination: 'Tokyo, Japan',
      date: 'Nov 5-12, 2024',
      icon: '🗾',
      className: 'tokyo'
    },
    { 
      id: 3, 
      title: 'NYC Getaway', 
      destination: 'New York, USA',
      date: 'Oct 20-27, 2024',
      icon: '🗽',
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

  // Group regions
  const groupedRegions = {}
  if (groupBy === 'continent') {
    sortedRegions.forEach(region => {
      if (!groupedRegions[region.continent]) {
        groupedRegions[region.continent] = []
      }
      groupedRegions[region.continent].push(region)
    })
  } else {
    groupedRegions['All Regions'] = sortedRegions
  }

  return (
    <div className="landing-container">
      <div className="main-wrapper">
{/* App Header */}
<div className="app-header">
  <span className="app-name">GlobalTrotter</span>

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
                    className={`region-card ${region.className}`}
                  >
                    <span className="region-icon">{region.icon}</span>
                    <span className="region-name">{region.name}</span>
                    <span className="region-popularity">{region.popularity}% popular</span>
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
        </div>

        {/* Previous Trips */}
        <div className="trips-section">
          <h2 className="section-title">Previous Trips</h2>
          <div className="trips-grid">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className={`trip-card ${trip.className}`}
              >
                <span className="trip-icon">{trip.icon}</span>
                <h3 className="trip-title">{trip.title}</h3>
                <p className="trip-destination">{trip.destination}</p>
                <p className="trip-date">{trip.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Trip Button */}
        <button className="plan-btn" onClick={() => navigate('/createtrip')}>
  <span className="plan-icon">+</span>
  <span>Plan a trip</span>
</button>

      </div>
    </div>
  )
}

export default Landingpage