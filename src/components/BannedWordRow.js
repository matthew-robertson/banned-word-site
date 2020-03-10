import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

export default function BannedWordRow(props) {
  const bannedWord = props.bannedWord

  const [toEdit, setToEdit] = useState(bannedWord.banned_word);
  const handleChange = () => event => {
    setToEdit(event.target.value);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {bannedWord.rowid}
      </TableCell>
      <TableCell align="right">
        <TextField
        id={"banned_word"+bannedWord.rowid}
        label="edited banned word"
        value={toEdit}
        onChange={handleChange()}
        margin="normal"
        variant="outlined"
      />
      </TableCell>
      <TableCell align="right" onClick={()=> {props.onWordClick(bannedWord.rowid, toEdit)}}> Update Word</TableCell>
      <TableCell align="right">{bannedWord.calledout_at}</TableCell>
      <TableCell align="right">{bannedWord.infracted_at}</TableCell>
    </TableRow>
  );
}