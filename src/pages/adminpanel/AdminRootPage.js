import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminRootPage() {
  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <p>
        <Link to="servers">See all servers</Link>
      </p>
    </div>
  )
}