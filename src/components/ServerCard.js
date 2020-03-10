import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
  disable: {
    opacity: 0.4,
    filter: 'grayscale(100%)',
  }
});

export default function ServerCard(props) {
	const classes = useStyles()
  const imgStyle = !!props.invite_link ? classes.disable: {}
  const history = useHistory()
  	// Setting initial state

    function clickServer() {
      if (!!props.invite_link) {
        const win = window.open(props.invite_link, '_blank');
        if (win != null) {
          win.focus()
        }
      } else {
        history.push("servers/" + props.server_id)
      }
    }
  	
  	return (
    <Card className={classes.card}>
      <CardContent onClick={clickServer}>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {props.name}
        </Typography>
        <div className={imgStyle} >
          <img width='120px' src={props.icon} />
        </div>
      </CardContent>
    </Card>
  );
 }
