import React, {useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
// import Select from 'react-select';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import ShipmentDialog from "../Dialog/ShipmentDialog";
import {formValid, isPositiveNumber, validateName} from "../validation/validation";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

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
    const [countryName, setCountryName] = useState("")
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState({receiverName:'', weight:''});
    const formFields = { receiverName: receiverName, weight: weight};


    useEffect(()=>{
        axios.get('http://localhost:8080/api/settings/countries ', { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                setCountries(res.data);
                console.log(res.data[0].id)
                setCountry({id: res.data[0].id})
                setCountryName(res.data[0].countryName)
            })
            .catch(err => {
                console.log(err);
            })
    },[])

  

    const onSubmitForm = async e => {
        
        e.preventDefault();

        if(formValid(errorMessage, formFields)) {
        try {
            const body = {receiverName, weight, boxcolor, country};
            await fetch(
                "http://localhost:8080/api/shipment",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
            'Authorization': localStorage.getItem('token')
        },
                    body: JSON.stringify(body)

                }
            ).then(response => response.text())
            .then(history.push("/mainPage"))
                // .then(text => alert(text))

        } catch (err) {
            console.error(err.message);
        }
        }else{
            alert('Invalid credentials ! Make sure that all the required fields filled');
        }
    };

    const getCountryName = async(id) => {
    await axios.get(`http://localhost:8080/api/settings/country/${id}`)
         .then(res=>{
             console.log(res.data);
             setCountryName(res.data.countryName)
         })
         .catch(err => {
             console.log(err);
         })
    }

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
             setCountry({id})
             getCountryName(id)
            };

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
                                <InputLabel id="demo-simple-select-label">{countryName}</InputLabel>
                                <Select
                                labelId="select-label"
                                id="country-select"
                                // value={}
                                required
                                onChange={onDestinationCountryChanged}
                                >
                            {countries.map(name => (
                                <MenuItem key={name.id} value={name.id} >{name.countryName}</MenuItem>

                            ))}
                                </Select>
                            </FormControl>
                    </div>
                    <br></br>

                <br></br>
                <div className="floatRightBtn">
                    <ShipmentDialog receiverName={receiverName} weight={weight} boxcolor={boxcolor} countryName={countryName} onSubmitForm={onSubmitForm}  />
                </div>
            </Form>
        </div>
    );
}
export default NewShipment;