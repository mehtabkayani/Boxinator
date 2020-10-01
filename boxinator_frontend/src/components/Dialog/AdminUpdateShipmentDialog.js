import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GETDEFAULT} from '../../api/CRUD'
import axios from 'axios';

export default function AdminUpdateShipmentDialog({receiverName, weight, boxcolor, countryName, onSubmitForm}) {
  const [open, setOpen] = useState(false);

  let name = receiverName;
  let totalWeight = weight;
  let color = boxcolor;
  let SendingCountryName = countryName;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are the values correct?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Receiver: {name}</p>
            <p>Weight: {totalWeight} kg</p>
            <p>Box Color: <span style={{backgroundColor: `${color}`, color: `${color}`}}>{color}</span></p> 
            <p>Country: {SendingCountryName}</p>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No,Edit shipment
          </Button>
          <Button onClick={onSubmitForm} color="primary" autoFocus>
            Yes, update!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}