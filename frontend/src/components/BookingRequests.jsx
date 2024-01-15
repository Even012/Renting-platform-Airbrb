import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HistoryCard from './HistoryCard';
import RequestCard from './RequestCard';
import StatsCard from './StatsCard';
import { useParams } from 'react-router-dom';

const BookingRequests = (props) => {
  const params = useParams();
  const [bookingRequests, setBookingRequests] = React.useState([]);
  const [requestHistory, setRequestHistory] = React.useState([]);
  const [acceptedRequests, setAcceptedRequests] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5005/bookings', {
      method: 'GET',
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
          setBookingRequests(data.bookings.filter(request => request.listingId === params.id && request.status === 'pending'));
          setRequestHistory(data.bookings.filter(request => request.listingId === params.id && request.status !== 'pending'));
          setAcceptedRequests(data.bookings.filter(request => request.listingId === params.id && request.status === 'accepted'));
        }
      })
  }, [])

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Pending Booking Requests
          </Typography>
          <Container sx={{ py: 2 }}>
            <Grid container>
              {bookingRequests.map((request, index) => (
                <RequestCard key={index} request={request} bookingRequests={bookingRequests} setBookingRequests={setBookingRequests} requestHistory={requestHistory} setRequestHistory={setRequestHistory}/>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Booking Request History
          </Typography>
          <Container sx={{ py: 2 }}>
            <Grid container>
              {requestHistory.map((request, index) => (
                <HistoryCard key={index} request={request} requestHistory={requestHistory} setRequestHistory={setRequestHistory}/>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Other Listing Stats
          </Typography>
          <Container sx={{ py: 2 }} maxWidth="sm">
            <StatsCard acceptedRequests={acceptedRequests} setAcceptedRequests={setAcceptedRequests} />
          </Container>
        </Box>
      </Container>
    </>
  )
}

export default BookingRequests;
