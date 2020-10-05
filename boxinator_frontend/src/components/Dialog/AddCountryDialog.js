import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddCountryDialog({countryName, countryCode, multiplyerNumber, onSubmitForm}) {
    const [open, setOpen] = useState(false);

    let name = countryName;
    let code = countryCode;
    let multyplyerNumber = multiplyerNumber;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Country
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
                        <p>Country name: {name}</p>
                        <p>Country code: {code} kg</p>
                        <p>Multiplying number: {multyplyerNumber}</p>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No,Edit shipment
                    </Button>
                    <Button onClick={onSubmitForm} color="primary" autoFocus>
                        Place order
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}