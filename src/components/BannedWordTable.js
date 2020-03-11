import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import BannedWordRow from './BannedWordRow'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function BannedWordTable(props) {
  const classes = useStyles();
  const bannedWords = props.bannedWords

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Banned Word</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Last Infracted At</TableCell>
              <TableCell align="right">Last Called Out At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bannedWords.map(banned_word => (
              <BannedWordRow key={banned_word.rowid}
                bannedWord={banned_word}
                onWordDelete={props.onWordDelete}
                onWordClick={props.onWordClick} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}