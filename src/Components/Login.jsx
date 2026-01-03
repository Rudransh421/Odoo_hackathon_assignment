import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login({ onSwitchToRegister }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

      // Just navigate directly - skip validation for now
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('currentUser', JSON.stringify({ username: formData.username }))
      
      console.log('Login successful')
      
      // Navigate to landing page
      navigate('/landingpage')
      
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-text">Photo</span>
          </div>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="switch-auth">
          <p>Don't have an account? 
            <button 
              type="button" 
              onClick={onSwitchToRegister}
              className="switch-link"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login