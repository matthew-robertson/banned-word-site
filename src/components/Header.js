import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { AuthService } from '../services/AuthService';

const useStyles = makeStyles(theme => ({
  header: {
    float: 'left'
  },
  headerRight: {
    float: 'right',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory()
  const [authService] = useState(new AuthService())
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    authService.getUser().then(storedUser => {
      if (storedUser) {
        setUser(storedUser)
      }})
  }, [])

  useEffect(() => {
    if(user && user.access_token) {
      const getUser = async () => {
        const { data } = await axios.get('http://127.0.0.1:5000/v1/users/@me', { headers: {'Authorization': 'Bearer ' + user.access_token }})
        setUserData(data)
      }
      getUser()
    }
  }, [user])

  function renderLoggedIn() {
    if (!userData) return

    return (
      <div className={classes.headerRight} >
        <div>
          <img width='40px' src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} />
          <Link to="/user">{userData.username}</Link>
        </div>
        <Button onClick={ () => authService.logout()}> Log out </Button>
      </div>
    )
  }

  function renderLoggedOut() {
    return (
    <div className={classes.headerRight} >
      <button onClick={() => authService.login()}> Sign in with Discord </button>
    </div>
    )
  }
  
  return (
    <div>
      <Link to="/">Home</Link>
      {user ? renderLoggedIn() : renderLoggedOut()}
    </div>
  );
 }
