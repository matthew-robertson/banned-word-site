import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
  const [needsUpdate, setNeedsUpdate] = React.useState(false)

  const initialServersState = {
  	servers: [],
  	loading: true
  }
  const [servers, setServers] = useState(initialServersState)

  const [toAdd, setToAdd] = React.useState("")
  const handleChange = () => event => {
    setToAdd(event.target.value)
  }

  useEffect(() => {
    const getServers = async () => {
     	const { data } = await axios.get('http://127.0.0.1:5000/v1/servers')
	    setServers(data)
    }

    getServers()
  }, [needsUpdate]) // Don't forget the `[]`, which will prevent useEffect from running in an infinite loop

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
      <div>
        <TextField
        id="word-to-add"
        label="New Server's ID"
        value={toAdd}
        onChange={handleChange()}
        margin="normal"
        variant="outlined"
      />
        <Button variant="contained" color="primary" onClick={()=>{addServer(toAdd).then(() => {setNeedsUpdate(true)})}}>
          Add Server
        </Button>
      </div>
    </div>
  );
}

function addServer(serverToAdd) {
  return axios.post('http://127.0.0.1:5000/v1/servers',
    {
      server_id: serverToAdd
    }).then( response => console.log(response))
}