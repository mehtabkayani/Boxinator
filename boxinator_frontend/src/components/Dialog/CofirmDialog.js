import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import { Tooltip } from '@material-ui/core';

export default function ConfirmDialog({packetId,handleCancelShipment}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Cancel
      </Button> */}
      <Tooltip title="Cancel"><CancelIcon color="secondary" onClick={handleClickOpen}></CancelIcon></Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to cancel your shipment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
           <Button onClick={handleClose} color="primary">
            No
          </Button> 
          <Button onClick={() => handleCancelShipment(packetId)} color="primary" autoFocus>
            Yes, cancel!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}