import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { fileToDataUrl } from '../helpers';

const EditListing = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [listingData, setListingData] = React.useState([]);
  const [listingAddress, setListingAddress] = React.useState('');
  const [listingMetadata, setListingMetadata] = React.useState([]);
  const [propertyType, setPropertyType] = React.useState('');
  const [propertyAmenities, setPropertyAmenities] = React.useState([]);

  const convertImage = async (image) => {
    let storedImage = '';
    if (image !== undefined) {
      storedImage = await fileToDataUrl(image);
      console.log('storedImage2', storedImage);
      return storedImage;
    }
  }

  const convertAllImages = async (allImages) => {
    const convertedImages = [];
    for (const image of allImages) {
      if (image.name !== '') {
        const convertedImage = await convertImage(image);
        convertedImages.push(convertedImage);
      }
    }
    return convertedImages;
  }

  const handleType = (event) => {
    setPropertyType(event.target.value);
  }

  const handleAmenities = (event) => {
    if (propertyAmenities.includes(event.target.value)) {
      setPropertyAmenities(propertyAmenities.filter((amenity) => amenity !== event.target.value));
    } else {
      setPropertyAmenities([...propertyAmenities, event.target.value]);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const convertedThumnail = await convertImage(data.get('thumbnail'));
    const allImages = [data.get('image-1'), data.get('image-2'), data.get('image-3')]
    const convertedImages = await convertAllImages(allImages);
    const propertyAddress = {
      street: data.get('addressStreet'),
      city: data.get('addressCity'),
      state: data.get('addressState'),
      postcode: data.get('addressPostcode'),
      country: data.get('addressCountry')
    }
    const propertyMetadata = {
      type: propertyType,
      numBedrooms: data.get('numBedrooms'),
      numBeds: data.get('numBeds'),
      numBathrooms: data.get('numBathrooms'),
      amenities: propertyAmenities,
      images: convertedImages
    }

    if (data.get('listingName') === '') {
      alert('Please enter a listing name');
    } else if (data.get('addressStreet') === '' || data.get('addressCity') === '' || data.get('addressState') === '' ||
      data.get('addressPostcode') === '' || data.get('addressCountry') === '') {
      alert('Please fill in all address fields');
    } else if (!(/[0-9]$/).test(data.get('addressPostcode'))) {
      alert('Please enter a valid postcode');
    } else if (data.get('price') === '') {
      alert('Please enter a listing price');
    } else if (propertyType === '') {
      alert('Please select a property type');
    } else if (data.get('numBeds') === '' || data.get('numBedrooms') === '' || data.get('numBathrooms') === '') {
      alert('Please enter the number of beds, bedrooms and bathrooms');
    } else {
      fetch(`http://localhost:5005/listings/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: data.get('listingName'),
          address: propertyAddress,
          price: data.get('price'),
          thumbnail: convertedThumnail,
          metadata: propertyMetadata,
        })
      })
        .then(data => data.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            navigate('/dashboard');
          }
        })
    }
  }

  React.useEffect(() => {
    fetch(`http://localhost:5005/listings/${params.id}`, {
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
          setListingData(data.listing);
          setListingAddress(data.listing.address);
          setListingMetadata(data.listing.metadata);
          // setListingReviews(data.listing.reviews);
        }
      })
  }, [])

  const HandleCancelBtn = () => {
    navigate('/dashboard');
  }

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
            Edit Listing
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Change thumbnail
                  <Input type="file" name="thumbnail" id="thumbnail" accept="image/jpeg, image/png, image/jpg" />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="listingName"
                  id="listingName"
                  label="Name of Listing"
                  placeholder={listingData.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="addressStreet"
                  id="addressStreet"
                  label="Listing Street"
                  placeholder={listingAddress.street}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="addressCity"
                  id="addressCity"
                  label="Listing City"
                  placeholder={listingAddress.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="addressState"
                  id="addressState"
                  label="Listing State"
                  placeholder={listingAddress.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="addressPostcode"
                  id="addressPostcode"
                  label="Listing Postcode"
                  placeholder={listingAddress.postcode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="addressCountry"
                  id="addressCountry"
                  label="Listing Country"
                  placeholder={listingAddress.country}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="price"
                  id="price"
                  label="Listing Price ($ per night)"
                  type="number"
                  placeholder={listingData.price}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="type" required>Property Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="property-type"
                    name="property-type"
                    onChange={handleType}
                  >
                    <FormControlLabel value="House" control={<Radio />} label="House" />
                    <FormControlLabel value="Apartment" control={<Radio />} label="Apartment" />
                    <FormControlLabel value="Bed And Breakfast" control={<Radio />} label="Bed and Breakfast" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={7} min={0}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="numBedrooms"
                  id="numBedrooms"
                  label="Number of Bedrooms"
                  type="number"
                  placeholder={listingMetadata.numBedrooms}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={5} min={0}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="numBeds"
                  id="numBeds"
                  label="Number of Beds"
                  type="number"
                  placeholder={listingMetadata.numBeds}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} min={0}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="numBathrooms"
                  id="numBathrooms"
                  label="Number of Bathrooms"
                  type="number"
                  placeholder={listingMetadata.numBathrooms}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="amenities">Property Amenities</FormLabel>
                  <FormGroup onChange={handleAmenities} value={listingMetadata.amenities ? listingMetadata.amenities : ''}>
                    <Grid item xs={12}>
                      <FormControlLabel value="WiFi" control={<Checkbox />} label="Wi-Fi" />
                      <FormControlLabel value="Kitchen" control={<Checkbox />} label="Kitchen" />
                      <FormControlLabel value="Pool" control={<Checkbox />} label="Pool" />
                      <FormControlLabel value="Parking" control={<Checkbox />} label="Free Parking" />
                      <FormControlLabel value="WasherDryer" control={<Checkbox />} label="Washing Machine and Dryer" />
                      <FormControlLabel value="AirConditioning" control={<Checkbox />} label="Air Conditioning" />
                      <FormControlLabel value="Heating" control={<Checkbox />} label="Heating" />
                      <FormControlLabel value="SelfCheckIn" control={<Checkbox />} label="Self Check-In" />
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* limited additional photos to 3 */}
                <Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Add another image
                  <Input type="file" name="image-1" id="image-1" accept="image/jpeg, image/png, image/jpg" />
                </Button>
                <Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 1 }}>
                  Add another image
                  <Input type="file" name="image-2" id="image-2" accept="image/jpeg, image/png, image/jpg" />
                </Button>
                <Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 1 }}>
                  Add another image
                  <Input type="file" name="image-3" id="image-3" accept="image/jpeg, image/png, image/jpg" />
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Submit Edit
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2, mb: 2 }}
              onClick={HandleCancelBtn}
            >
              Cancel Edit
            </Button>

          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EditListing;
