import React, { useState } from 'react'
import './Auth.css'

function Registration({ onSwitchToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if email already exists
      if (users.some(user => user.email === formData.email)) {
        setError('Email already registered')
        setLoading(false)
        return
      }

      // Create username from email
      const username = formData.email.split('@')[0]
      
      // Generate random password
      const password = Math.random().toString(36).slice(-8)
      
      // Add new user
      const newUser = {
        id: Date.now(),
        ...formData,
        username: username,
        password: password
      }
      
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      console.log('Registration successful:', newUser)
      
      // Show alert with credentials
      alert(`Registration Successful!\n\nUsername: ${username}\nPassword: ${password}\n\nPlease save these credentials to login.`)
      
      // Switch to login page
      onSwitchToLogin()
      
    } catch (err) {
      setError('Registration failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        {/* Logo Section */}
        <div className="logo-section-small">
          <div className="logo-circle">
            <span className="logo-text">Photo</span>
          </div>
        </div>

        {/* Registration Form */}
        <form className="auth-form register-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="additionalInfo"
              placeholder="Additional Information"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="switch-auth">
          <p>Already have an account? 
            <button 
              type="button" 
              onClick={onSwitchToLogin}
              className="switch-link"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration