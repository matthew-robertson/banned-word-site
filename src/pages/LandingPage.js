import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthService } from '../services/AuthService';

export default function LandingPage() {
	const [auth, setAuth] = useState(new AuthService())
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to="/admin">Admin Panel</Link>
      </p>
      <button onClick={() => auth.login().then(a => console.log(a))}>
      	Sign in to Discord
      </button>
    </div>
  )
}