import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const DeletePopup = (props) => {
  // const navigate = useNavigate();
  const handleClose = () => {
    props.setOpenDelete(false);
  }

  const HandleDeleteBtn = () => {
    fetch(`http://localhost:5005/listings/${props.listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          props.setListings(props.listings.filter((listing) => listing.id !== props.listingId));
          handleClose();
        }
      })
  }

  return (
    <>
      < Dialog open={props.openDelete} onClose={handleClose} aria-labelledby="delete-alert-dialog-title"
        aria-describedby="delete-alert-dialog-description">
        <DialogTitle>
          Delete listing: {props.listingName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={HandleDeleteBtn} sx={{ color: 'red' }}>Delete</Button>
        </DialogActions>
      </ Dialog>
    </>
  )
}

export default DeletePopup;
