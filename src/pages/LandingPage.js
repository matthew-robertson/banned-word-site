import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthService } from '../services/AuthService'
import Header from '../components/Header'

export default function LandingPage() {
	const [auth, setAuth] = useState(new AuthService())
  return (
    <div className="container">
      <h1>Home Page</h1>
      <button onClick={() => auth.login().then(a => console.log(a))}>
      	Sign in to Discord
      </button>
    </div>
  )
}