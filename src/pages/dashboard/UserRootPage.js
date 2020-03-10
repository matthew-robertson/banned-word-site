import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { AuthService } from '../../services/AuthService';
import ServerCard from '../../components/ServerCard'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 450,
  },
}));

export default function UserRootPage(props) {
  const classes = useStyles();
  const [authService] = useState(new AuthService())
  const [user, setUser] = useState(null)

  const initialServersState = {
    servers: [],
    loading: true
  }
  const [servers, setServers] = useState(initialServersState)

  useEffect(() => {
    authService.getUser().then(storedUser => {
      if (storedUser) {
        setUser(storedUser)
      } else {
        authService.loginCallback(props.location.pathname).then( () => {
          authService.getUser().then(nUser => { setUser(nUser) })
        })
      }      
    })
  }, [])

  useEffect(() => {
    if(user && user.access_token) {
      const getUsersServers = async () => {
        const { data } = await axios.get('http://127.0.0.1:5000/v1/users/@me/guilds', { headers: {'Authorization': 'Bearer ' + user.access_token }})
        const discordServers = data.map(server => {
          if (server.icon) {
            server.thumbnail = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`
          } else {
            server.thumbnail = 'https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png'
          }
          return server
        })
        setServers(discordServers)
      }
      getUsersServers()
    }
  }, [user])

  return servers.loading ? (
    <div>Loading...</div>
  ) :
  (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {servers.map(server => (
          <GridListTile key={server.id} cols={1}>
            <ServerCard invite_link={server.invite_link} name={server.name} icon={server.thumbnail} server_id={server.id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}