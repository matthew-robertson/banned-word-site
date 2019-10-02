import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ServerCard from '../../components/ServerCard'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default function AdminServersPage() {
  const classes = useStyles();

  const initialServersState = {
  	servers: [],
  	loading: true
  }
  const [servers, setServers] = useState(initialServersState)

  useEffect(() => {
    const getServers = async () => {
     	const { data } = await axios.get('http://127.0.0.1:5000/v1/servers')
	    setServers(data)
    }

    getServers()
  }, []) // Don't forget the `[]`, which will prevent useEffect from running in an infinite loop

  return servers.loading ? (
    <div>Loading...</div>
  ) :
  (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={2}>
        {servers.map(server => (
          <GridListTile key={server.server_id} cols={1}>
            <ServerCard server_id={server.server_id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}