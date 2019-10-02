import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ServerCard(props) {
	const classes = useStyles();
  	// Setting initial state
  	
  	return (
    <Card className={classes.card}>
      <CardContent onClick={()=>{console.log("FDSA")}}>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {props.server_id}
        </Typography>
        <Typography variant="body2" component="p">
          This server hates Vore.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
        	<Link to={"servers/" + props.server_id}>Manage this server</Link>
        </Button>
      </CardActions>
    </Card>
  );
 }
