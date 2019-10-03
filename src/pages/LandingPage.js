import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to="/admin">Admin Panel</Link>
      </p>
    </div>
  )
}