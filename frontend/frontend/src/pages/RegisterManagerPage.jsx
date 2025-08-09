// src/pages/RegisterManagerPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { registerManager } from '../services/authService'
import BackButton from '../components/common/BackButton'; // Import

const RegisterManagerPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    contactNo: '',
    age: '',
    street: '',
    city: '',
    pincode: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await registerManager(formData)
      setSuccess('Hotel Manager registered successfully!')
      setFormData({
        firstName: '', lastName: '', email: '', password: '', gender: '',
        contactNo: '', age: '', street: '', city: '', pincode: ''
      }); // Reset form
    } catch (err) {
      setError('Registration failed. Please try again.')
      console.error(err)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="mt-4">
          <BackButton /> {/* Add Here */}
      </div>

      <div className="card shadow-lg p-4 my-4">
        <h2 className="text-center mb-4">Register New Hotel Manager</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email Id</label>
              <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" value={formData.password} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          {/* Other fields can be added here as needed */}
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Register Manager</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterManagerPage