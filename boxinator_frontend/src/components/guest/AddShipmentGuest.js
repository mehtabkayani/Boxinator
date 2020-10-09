import React, {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
// import Select from "react-select";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import '../../style/style.css';
import sendGuestLogo from '../../images/addShipmentAsGuest/deliveryGuest.png'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {formValid, isPositiveNumber, validateEmail, validateName} from "../validation/validation";
import { POSTDEFAULT, GETDEFAULT } from "../../api/CRUD";
import ShipmentDialog from "../Dialog/ShipmentDialog";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



const AddShipmentGuest = () => {
    const classes = useStyles();
    const history = useHistory();

    const [receiverName, setReceiverName] = useState('');
    const [weight, setWeight] = useState();
    const [boxcolor, setBoxColor] = useState("#050505");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({})
    const [user, setUser] = useState({email : ""});
    const [errorMessage, setErrorMessage] = useState({receiverName:'', weight:'', email:''});
    const formFields = { receiverName: receiverName, weight: weight, user:user};


    useEffect (()=>{
        GETDEFAULT('/settings/countries').then(res => setCountries(res.data)).catch(err => console.log(err));
    },[])

    const onSubmitForm = async e => {
        const body = {receiverName, weight,boxcolor,user, country};
        
        if(formValid(errorMessage, formFields))
            await axios.post("https://boxinator-backend-spring.herokuapp.com/api/shipment", body)
                .then(res=> history.push('/')).catch(err => console.log(err)); 
        else
            alert('Invalid credentials ! Make sure that all the required fields filled');
    };

    const onReceiverNameChange = e =>{
        setReceiverName(e.target.value.trim());
        setErrorMessage({receiverName: validateName(e.target.value)}) ;
        
    } 
    const onEmailChange = e => {
        setUser({email: e.target.value.trim()});
        setErrorMessage({email: validateEmail(e.target.value)}) ;
};
    const onWeightChange = e => {
        setWeight(e.target.value);
        setErrorMessage({weight: isPositiveNumber(e.target.value)}) ;
        
    }
    const onBoxColorChange = (e) => setBoxColor(e.target.value);

    const getCountry = async(id) => await GETDEFAULT(`/settings/country/${id}`)
                                            .then(res => setCountry(res.data))
                                            .catch(err => console.log(err));

    const onDestinationCountryChange = (e) =>{
        let id = parseInt(e.target.value)
          
         setCountry(getCountry(id));
   
        };
        const printCountryList = countries.map(country => (<MenuItem key={country.id} value={country.id}>{country.countryName}</MenuItem>))

     
    return (
        <div className="container divPadding">
            <Form onSubmit={onSubmitForm} className="form-container">
                <h1>Add new shipment as guest: </h1>
                <br></br>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={onEmailChange} required/>
                        <span className="errorMessage">{errorMessage.email}</span>
                    </Form.Group>
                    <div>
                        <Form.Label>Receiver name : </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={onReceiverNameChange} required/>
                        <span className="errorMessage">{errorMessage.receiverName}</span>
                    </div>
                    <div>
                        <Form.Label>Weight (kg): </Form.Label>
                        <Form.Control type="number" placeholder="Enter weight" onChange={onWeightChange} required/>
                        <span className="errorMessage">{errorMessage.weight}</span>
                    </div>
                    <div>
                        <Form.Label>Box colour: </Form.Label>
                        <Form.Control type="color" value={boxcolor}  onChange={onBoxColorChange} required/>
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
                                onChange={onDestinationCountryChange}
                                >
                            {printCountryList}
                                </Select>
                            </FormControl>
                    </div>
                    <br></br>
                    {/* <div>
                        <Button type="submit" variant="outline-danger">Add shipment</Button>
                    </div> */}
                    <div className="floatRightBtn">
                    <ShipmentDialog receiverName={receiverName} weight={weight} boxcolor={boxcolor} countryName={country.countryName} onSubmitForm={onSubmitForm}  />
                </div>
                </Form>

            <br></br>
            <img src={sendGuestLogo} alt=""></img>



        </div>
    );
}
export default AddShipmentGuest;