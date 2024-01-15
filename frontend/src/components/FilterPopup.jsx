import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterPopup = (props) => {
  const [bedrooms, setBedrooms] = React.useState([1, 3]);
  const [dateRange, setDateRange] = React.useState([null, null]); // [start, end]
  const [price, setPrice] = React.useState([50, 300]); // [min, max]
  const [rating, setRating] = React.useState('');

  const handleBedroomsChange = (event, newValue) => {
    setBedrooms(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Function to close the popup
  const handleClose = () => {
    props.setOpen(false);
  };

  // Function to handle the application of filters
  const handleApplyFilters = () => {
    let filteredListings = props.listings.filter(listing => {
      return listing.price >= price[0] && listing.price <= price[1];
    })
    const Promises = filteredListings.map(listing =>
      fetch(`http://localhost:5005/listings/${listing.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }))
    Promise.all(Promises)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        data = data.map(element => element.listing)
        filteredListings = data.filter(element => {
          console.log(element);
          console.log(element.metadata.numBedrooms, bedrooms);
          return (parseInt(element.metadata.numBedrooms) >= bedrooms[0] && parseInt(element.metadata.numBedrooms) <= bedrooms[1]);
        })
        // console.log(dateRange[0] === null);
        if (dateRange[0] !== null) {
          filteredListings = filteredListings.filter(element => {
            console.log(dateRange[0], element.availability[0]);
            const date1 = new Date(element.availability[0]);
            date1.setDate(date1.getDate() - 1);
            const date2 = new Date(dateRange[0]);
            console.log(date1, date2);
            return (date1 <= date2);
          })
            .filter(element => {
              console.log(dateRange[1], element.availability[1]);
              const date3 = new Date(element.availability[1]);
              date3.setDate(date3.getDate() - 1);
              const date4 = new Date(dateRange[1]);
              console.log(date3, date4);
              return (date3 >= date4);
            })
        }
        props.setListings(JSON.parse(localStorage.getItem('publishedListings')).filter(listing => (filteredListings.filter(fl => (fl.title === listing.title && fl.owner === listing.owner)).length === 1)));
      })
    props.setListings(filteredListings);
    handleClose(); // Close the dialog after applying filters
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        sx={{
          '& .MuiDialog-paper': {
            width: '80%', // or any desired width
            height: '60vh', // Full viewport height
          }
        }}>
        <DialogTitle id="form-dialog-title">
          Filters
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {/* filters */}
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <Typography gutterBottom>Number of Bedrooms</Typography>
            <Slider
              value={bedrooms}
              onChange={handleBedroomsChange}
              valueLabelDisplay="auto"
              min={0}
              max={6}
              marks
            />
            <Typography gutterBottom>Date Range</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={dateRange[0]}
                  onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
                />
                <MobileDatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={dateRange[1]}
                  onChange={(newValue) => setDateRange([dateRange[0], newValue])}
                />
              </LocalizationProvider>
            </Box>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              step={100}
              max={2500}
              marks
            />
            <Typography gutterBottom>Review Ratings</Typography>
            <FormControl fullWidth>
              <InputLabel id="rating-select-label">Rating</InputLabel>
              <Select
                labelId="rating-select-label"
                id="rating-select"
                value={rating}
                label="Rating"
                onChange={handleRatingChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="low">Lowest to Highest</MenuItem>
                <MenuItem value="high">Highest to Lowest</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyFilters} color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterPopup;
