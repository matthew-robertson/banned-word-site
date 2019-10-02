import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import BannedWordTable from '../../components/BannedWordTable'

export default function AdminServerPage(props) {
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
  useEffect(() => {
    const getServer = async () => {
     	const { data } = await axios.get('http://127.0.0.1:5000/v1/servers/' + serverId)
	    setServer(data)
      console.log(data)
    }

    getServer()
  }, [])

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
        onWordClick={(banId, newWord) => {editWord(serverId, banId, newWord)}} />
      <div>
        <TextField
        id="word-to-add"
        label="New Banned Word"
        value={toAdd}
        onChange={handleChange()}
        margin="normal"
        variant="outlined"
      />
        <Button variant="contained" color="primary" onClick={()=>{addWord(serverId, toAdd)}}>
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