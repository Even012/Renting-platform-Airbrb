import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeletePopup from './DeletePopup';
import PublishPopup from './PublishPopup';
import UnpublishPopup from './UnpublishPopup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ListingCard = (props) => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openPublish, setOpenPublish] = React.useState(false);
  const [openUnpublish, setOpenUnpublish] = React.useState(false);
  const [listingName, setListingName] = React.useState('');
  const [listingId, setListingId] = React.useState('');
  const [listingData, setListingData] = React.useState([]);
  const [listingMetadata, setListingMetadata] = React.useState([]);
  const [listingReviews, setListingReviews] = React.useState([]);

  const HandleViewBtn = () => {
    navigate(`/dashboard/mylisting/${props.listing.id}`);
  }

  const HandlePublishOpen = () => {
    setOpenPublish(true);
  }

  const HandleRequestsOpen = () => {
    navigate(`/dashboard/bookingrequests/${props.listing.id}`);
  }

  const HandleUnpublishOpen = () => {
    setOpenUnpublish(true);
  }

  const HandleEditBtn = () => {
    navigate(`/dashboard/editlisting/${props.listing.id}`);
  }

  const HandleDeleteOpen = () => {
    setOpenDelete(true);
  }

  React.useEffect(() => {
    fetch(`http://localhost:5005/listings/${props.listing.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setListingName(props.listing.title);
          setListingId(props.listing.id);
          setListingData(data.listing);
          setListingMetadata(data.listing.metadata);
          setListingReviews(data.listing.reviews);
        }
      })
  }, [])

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="div"
          sx={{ pt: '56.25%' }}
          image={props.listing.thumbnail}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.listing.title}
          </Typography>
          <Typography>
            Property Type: {listingMetadata.type}
          </Typography>
          <Typography>
            Price ($ per night): {listingData.price}
          </Typography>
          <Typography>
            Number of Beds: {listingMetadata.numBeds}
          </Typography>
          <Typography>
            Number of Bathrooms: {listingMetadata.numBathrooms}
          </Typography>
          <Typography>
            Rating:
          </Typography>
          <Typography>
            Number of Reviews: {listingReviews.length}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Button size="small" onClick={HandlePublishOpen}>Publish</Button>
          <Button size="small" onClick={HandleRequestsOpen}>Booking Requests</Button>
          <Button size="small" onClick={HandleUnpublishOpen}>UnPublish</Button>
        </CardActions>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Button size="small" onClick={HandleViewBtn}>View</Button>
          <Button size="small" onClick={HandleEditBtn}>Edit</Button>
          <Button size="small" sx={{ color: 'red' }} onClick={HandleDeleteOpen}>Delete</Button>
        </CardActions>
        <DeletePopup openDelete={openDelete} setOpenDelete={setOpenDelete} listingName={listingName} listingId={listingId} setListingId={setListingId} listings={props.listings} setListings={props.setListings} />
        <PublishPopup openPublish={openPublish} setOpenPublish={setOpenPublish} listingName={listingName} listingId={listingId} />
        <UnpublishPopup openUnpublish={openUnpublish} setOpenUnpublish={setOpenUnpublish} listingName={listingName} listingId={listingId} />
      </Card>
    </Grid >
  );
}

export default ListingCard;
