import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const PublishedListings = (props) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = React.useState([]);
  // const [renderVal, setRenderVal] = React.useState('');
  // console.log(props.listings);
  const sortFunc = (a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  }
  const HandleClickView = (listingId) => {
    navigate(`/${listingId}`);
  }
  React.useEffect(() => {
    (props.token) &&
    (fetch('http://localhost:5005/bookings', {
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
          setBookings(data.bookings.filter(booking => booking.owner === localStorage.getItem('userEmail')));
          localStorage.setItem('bookings', JSON.stringify(data.bookings));
        }
      }))
  }, [props.listings])
  const bookedListingId = [...new Set(bookings.map(booking => parseInt(booking.listingId)))];
  // console.log(bookedListingId);
  const bookedListings = props.listings.filter(listing => bookedListingId.includes(listing.id));
  const otherListings = props.listings.filter(listing => !bookedListingId.includes(listing.id));
  // console.log(bookedListings, otherListings);

  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
      <Grid container spacing={4}>
        {/* Listings with status accepted or pending should appear first */}
        {bookedListings.concat(otherListings.sort(sortFunc)).map((listing) => (
          <Grid item key={listing.title} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: bookedListingId.includes(listing.id) ? '#F5EDBE' : 'none' }}
              onClick={ () => HandleClickView(listing.id) }
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image= { listing.thumbnail.length ? listing.thumbnail : 'https://i2.au.reastatic.net/800x600-resize,extend,r=33,g=40,b=46/a79d87435a8532c1bd33c9eec835b270111cb54c173b8f7393f13bc43aabc98f/image.jpg'}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {listing.title}
                </Typography>
                <Typography variant="h6">
                  {listing.address.street}
                </Typography>
                <Typography>
                  Number of total reviews: {listing.reviews.length}
                </Typography>
                <Typography sx={{ textDecoration: 'underline', pt: '1rem' }}>
                  ${listing.price} AUD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default PublishedListings;
