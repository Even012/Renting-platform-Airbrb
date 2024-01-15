import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PublishPopup = (props) => {
  const [dateRange, setDateRange] = React.useState([null, null]); // [start, end]

  const handleClose = () => {
    props.setOpenPublish(false);
  }

  const HandlePublishBtn = () => {
    fetch(`http://localhost:5005/listings/publish/${props.listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        availability: dateRange
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          handleClose();
        }
      })
  }

  return (
    <>
      < Dialog open={props.openPublish} onClose={handleClose} aria-labelledby="publish-dialog-title"
        aria-describedby="publish-dialog-description">
        <DialogTitle>
          Publish: {props.listingName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the available date range for this listing:
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={HandlePublishBtn} >Publish</Button>
        </DialogActions>
      </ Dialog>
    </>
  )
}

export default PublishPopup;
