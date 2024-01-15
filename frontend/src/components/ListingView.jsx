import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import WifiIcon from '@mui/icons-material/Wifi';
import ListItemIcon from '@mui/material/ListItemIcon';
import BookSection from './BookSection.jsx'
import ReviewSection from './ReviewSection.jsx'

const ListingView = (props) => {
  const [listing, setListing] = React.useState({});
  const bookings = JSON.parse(localStorage.getItem('bookings'));
  const filteredBookings = bookings.filter(booking => (parseInt(booking.listingId) === parseInt(props.listingID)) && booking.owner === localStorage.getItem('userEmail'));
  const acceptedBookings = filteredBookings.filter(booking => booking.status === 'accepted'); // TO Test
  console.log(acceptedBookings);
  console.log(listing);

  React.useEffect(() => {
    fetch(`http://localhost:5005/listings/${props.listingID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data.listing);
          const newListing = data.listing;
          setListing(newListing);
        }
      })
  }, [])
  return (
    (Object.keys(listing).length === 0) || (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ height: '100%', width: '100%', mt: '5%' }}>
          <Typography gutterBottom variant="h4" component="div" sx={{ p: '1rem' }}>
            {listing.title}
          </Typography>
          <CardActionArea sx={{ alignItems: 'center' }}>
            <CardMedia
              component="img"
              height="100%"
              image={listing.thumbnail}
              alt="listingImg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {listing.metadata.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                { listing.address.street }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {listing.metadata.numBedrooms} bedrooms | {listing.metadata.numBeds} beds | {listing.metadata.numBathrooms} bath
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ mt: '1rem' }}>
                {listing.price} AUD
              </Typography>
              <hr/>
              <Typography gutterBottom variant="h5" sx={{ mt: '2rem' }}>
                What this place offers
              </Typography>
              <List
                sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}
              >
                { listing.metadata.amenities.map(element => (
                  <ListItem sx={{ p: '0' }} key={element}>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <ListItemText primary={element} />
                  </ListItem>
                ))}
              </List>
              <hr />
              {((props.token) && props.listingID && listing.owner !== localStorage.getItem('userEmail')) && (<>
                <BookSection listingName={listing.title} listingId={props.listingID} listingPrice={listing.price} availability={listing.availability}/>
              </>)
              }
              {((props.token) && (acceptedBookings.length !== 0)) && (<>
                <hr />
                <ReviewSection listingId={props.listingID} bookingId={acceptedBookings[0].id}/>
              </>)}
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    )
  );
}

export default ListingView;
