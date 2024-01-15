import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CardContent } from '@mui/material';

const BookSection = (props) => {
  const [range, setRange] = React.useState([null, null]); // [start, end]
  const date1 = new Date(range[0]);
  const date2 = new Date(range[1]);
  const bookingLength = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  console.log(props.listingId);
  const total = parseInt(bookingLength) * parseInt(props.listingPrice);
  // console.log(range);
  const HandleBookBtn = () => {
    console.log(props.availability);
    console.log(range);
    const date1 = new Date(range[0]);
    const date2 = new Date(range[1]);
    const date3 = new Date(props.availability[0]);
    date3.setDate(date3.getDate() - 1);
    const date4 = new Date(props.availability[1]);
    date4.setDate(date4.getDate() - 1);

    console.log(date1, date2, date3, date4);
    // console.log(date1 >= date3);
    // console.log(date2 <= date4);
    (date1 < date3 || date2 > date4) && (alert('invalid booking'))
    !(date1 < date3 || date2 > date4) &&
    fetch(`http://localhost:5005/bookings/new/${props.listingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        dateRange: range,
        totalPrice: total,
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          alert('you have successfully booked this property!')
        }
      })
  }

  return (
    <>
      <CardContent sx={{ p: '1rem 0 0 0' }}>
        <Typography gutterBottom variant="h5" sx={{ p: 0 }}>
        Select the booking date range for this listing:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Start Date"
            inputFormat="MM/dd/yyyy"
            value={range[0]}
            onChange={(newValue) => setRange([newValue, range[1]])}
          />
          <MobileDatePicker
            label="End Date"
            inputFormat="MM/dd/yyyy"
            value={range[1]}
            onChange={(newValue) => setRange([range[0], newValue])}
          />
        </LocalizationProvider>
      </CardContent>
      <Button onClick={HandleBookBtn} sx={{ mt: '1rem' }}>Confirm</Button>
    </>
  )
}

export default BookSection;
