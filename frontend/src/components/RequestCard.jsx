import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { convertDate } from '../helpers';

const RequestCard = (props) => {
  const HandleAccept = () => {
    fetch(`http://localhost:5005/bookings/accept/${props.request.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log('booking accepted');
          props.setBookingRequests(props.bookingRequests.filter((request) => request.id !== props.request.id));
          props.request.status = 'accepted';
          props.setRequestHistory([...props.requestHistory, props.request]);
        }
      })
  }

  const HandleReject = () => {
    fetch(`http://localhost:5005/bookings/decline/${props.request.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log('booking rejected');
          props.setBookingRequests(props.bookingRequests.filter((request) => request.id !== props.request.id));
          props.request.status = 'declined';
          props.setRequestHistory([...props.requestHistory, props.request]);
        }
      })
  }

  return (
    <Grid sx={{ py: 1 }}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Booking Request
          </Typography>
          <Typography>
            Guest Email: {props.request.owner}
          </Typography>
          <Typography>
            Check-In: {convertDate(props.request.dateRange[0])}
          </Typography>
          <Typography>
            Check-Out: {convertDate(props.request.dateRange[1])}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Button size="small" onClick={HandleAccept}>Accept</Button>
          <Button size="small" sx={{ color: 'red' }} onClick={HandleReject}>Reject</Button>
        </CardActions>
      </Card>
    </Grid >
  );
}

export default RequestCard;
