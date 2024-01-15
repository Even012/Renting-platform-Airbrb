import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { fileToDataUrl } from '../helpers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const NewListing = () => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = React.useState('');
  const [propertyAmenities, setPropertyAmenities] = React.useState([]);

  const convertImage = async (thumbnail) => {
    let storedImage = '';
    if (thumbnail !== undefined) {
      storedImage = await fileToDataUrl(thumbnail);
      return storedImage;
    }
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
    const propertyAddress = {
      street: data.get('addressStreet'),
      city: data.get('addressCity'),
      state: data.get('addressState'),
      postcode: data.get('addressPostcode'),
      country: data.get('addressCountry')
    }
    const convertedThumnail = await convertImage(data.get('thumbnail'));
    const propertyMetadata = {
      type: propertyType,
      numBedrooms: data.get('numBedrooms'),
      numBeds: data.get('numBeds'),
      numBathrooms: data.get('numBathrooms'),
      amenities: propertyAmenities
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
      fetch('http://localhost:5005/listings/new', {
        method: 'POST',
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
  };

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
            Create a New Listing
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload thumbnail
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
                />
              </Grid>
              {/* <Typography component="h1" variant="h6">
                Listing Address
              </Typography> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  name="addressStreet"
                  id="addressStreet"
                  label="Listing Street"
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
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="amenities">Property Amenities</FormLabel>
                  <FormGroup onChange={handleAmenities}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Listing
            </Button>

          </Box>
        </Box>
      </Container>
    </>
  );
}

export default NewListing;
