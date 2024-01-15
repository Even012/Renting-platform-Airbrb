import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const UnpublishPopup = (props) => {
  const handleClose = () => {
    props.setOpenUnpublish(false);
  }

  const HandleUnpublishBtn = () => {
    fetch(`http://localhost:5005/listings/unpublish/${props.listingId}`, {
      method: 'PUT',
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
          handleClose();
        }
      })
  }

  return (
    <>
      < Dialog open={props.openUnpublish} onClose={handleClose} aria-labelledby="unpublish-alert-dialog-title"
        aria-describedby="unpublish-alert-dialog-description">
        <DialogTitle>
          Unpublish: {props.listingName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unpublish this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={HandleUnpublishBtn}>Unpublish</Button>
        </DialogActions>
      </ Dialog>
    </>
  )
}

export default UnpublishPopup;
