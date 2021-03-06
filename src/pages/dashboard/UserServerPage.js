import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { AuthService } from '../../services/AuthService';
import BannedWordTable from '../../components/BannedWordTable'

export default function UserServerPage(props) {
  const [needsUpdate, setNeedsUpdate] = React.useState(false)
  const serverId = props.match.params.server_id
  const initialServerState = {
  	server: {},
  	loading: true
  }

  const [toAdd, setToAdd] = React.useState("");
  const handleChange = () => event => {
    setToAdd(event.target.value);
  };

  const [server, setServer] = useState(initialServerState)
  const [authService] = useState(new AuthService())
  const [user, setUser] = useState(null)

  useEffect(() => {
    authService.getUser().then(storedUser => {
      if (storedUser) {
        setUser(storedUser)
      }    
    })
  }, [])

  useEffect(() => {
    if(user && user.access_token) {
      const getServer = async () => {
        const { data } = await axios.get('http://127.0.0.1:5000/v1/servers/'+ serverId, { headers: {'Authorization': 'Bearer ' + user.access_token }})
       setServer(data)
       setNeedsUpdate(false)
      }
      getServer()
    }
  }, [user])

  return server.loading ? (
    <div>Loading...</div>
  ) :
  (
    <div>
      <div>
        {server.timeout_duration_seconds} second timeout
      </div>
      <BannedWordTable 
        bannedWords={server.banned_words} 
        onWordClick={(banId, newWord) => {editWord(serverId, banId, newWord).then(() => {setNeedsUpdate(true)})}} />
      <div>
        <TextField
        id="word-to-add"
        label="New Banned Word"
        value={toAdd}
        onChange={handleChange()}
        margin="normal"
        variant="outlined"
      />
        <Button variant="contained" color="primary" onClick={()=>{addWord(serverId, toAdd).then(() => {setNeedsUpdate(true)})}}>
          Add Word
        </Button>
      </div>
    </div>
  );
}

function addWord(serverId, wordToAdd) {
  return axios.post('http://127.0.0.1:5000/v1/servers/' + serverId + '/bans',
    {
      banned_word: wordToAdd
    }).then( response => console.log(response))
}

function editWord(serverId, banId, newWord) {
  return axios.post('http://127.0.0.1:5000/v1/servers/' + serverId + '/bans/' + banId,
    {
      banned_word: newWord
    }).then( response => console.log(response))
}