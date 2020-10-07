import React, {useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import ShipmentDialog from "../Dialog/ShipmentDialog";
import {formValid, isPositiveNumber, validateName} from "../validation/validation";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { GETDEFAULT, POST } from "../../api/CRUD";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const NewShipment = () => {
    const classes = useStyles();
    const [receiverName, setReceiverName] = useState('');
    const [weight, setWeight] = useState();
    const [boxcolor, setBoxColor] = useState("#050505");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({})
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState({receiverName:'', weight:''});
    const formFields = { receiverName: receiverName, weight: weight};


    useEffect(()=>{
        GETDEFAULT('/settings/countries').then(res => setCountries(res.data)).catch(err => console.log(err));
    },[])

  

    const onSubmitForm = async e => {
        
        e.preventDefault();

        const body = {receiverName, weight, boxcolor, country};
        if(formValid(errorMessage, formFields))
            await POST('/shipment', body).then(res => history.push("/")).catch(err => console.log(err));
        else
            alert('Invalid credentials ! Make sure that all the required fields filled');
    };

    const getCountry = async(id) => await GETDEFAULT(`/settings/country/${id}`)
                                            .then(res => setCountry(res.data))
                                            .catch(err => console.log(err));

        const onReceiverNameChanged = e =>{
            setReceiverName(e.target.value.trim());
            setErrorMessage({receiverName: validateName(e.target.value)}) ;
        } 

        const onWeightChanged = e => {
            setWeight(e.target.value);
            setErrorMessage({weight: isPositiveNumber(e.target.value)}) ;
        }
        const onBoxColorChanged = (e) => {
            setBoxColor(e.target.value);
        }
    
        const onDestinationCountryChanged = (e) =>{
            let id = parseInt(e.target.value)
             setCountry(getCountry(id));
            };

            const printCountryList = countries.map(country => (<MenuItem key={country.id} value={country.id}>{country.countryName}</MenuItem>))
    return (
        <div className="container">
            <h1>New shipment: </h1>
            <br></br>
            <Form onSubmit={onSubmitForm} className="form-container">
            <div>
                        <Form.Label>Receiver name : </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={onReceiverNameChanged} required/>
                        <span className="errorMessage">{errorMessage.receiverName}</span>
                    </div>
                    <div>
                        <Form.Label>Weight (kg): </Form.Label>
                        <Form.Control type="number" placeholder="Enter weight" onChange={onWeightChanged} required/>
                        <span className="errorMessage">{errorMessage.weight}</span>
                    </div>
                    <div>
                        <Form.Label>Box colour: </Form.Label>
                        <Form.Control type="color" value={boxcolor}  onChange={onBoxColorChanged} required/>
                    </div>
                    <div>
                        <label>Destination country: </label>
                    <br></br>
                        
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                labelId="select-label"
                                id="country-select"
                                required
                                onChange={onDestinationCountryChanged}
                                >
                            {printCountryList}
                                </Select>
                            </FormControl>
                    </div>
                    <br></br>

                <br></br>
                <div className="floatRightBtn">
                    <ShipmentDialog receiverName={receiverName} weight={weight} boxcolor={boxcolor} countryName={country.countryName} onSubmitForm={onSubmitForm}  />
                </div>
            </Form>
        </div>
    );
}
export default NewShipment;