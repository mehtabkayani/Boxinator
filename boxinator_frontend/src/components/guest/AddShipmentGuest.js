import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
// import Select from "react-select";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import '../../style/style.css';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    const [receiverName, setReceiverName] = useState('');
    const [weight, setWeight] = useState();
    const [boxcolor, setBoxColor] = useState("#050505");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({})
    const [user, setUser] = useState({email : ""})


    useEffect (()=>{
        axios.get('http://localhost:8080/api/settings/countries')
        .then(res=>{
            setCountries(res.data);
            console.log(res.data[0].id)
            setCountry({id: res.data[0].id})
        })
        .catch(err => {
            console.log(err);
        })
    },[])


    const onSubmitForm = async e => {
    
        //e.preventDefault();
        try {
            const body = {receiverName, weight,boxcolor,user, country};
            await fetch(
                "http://localhost:8080/api/shipment",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
        },
                    body: JSON.stringify(body)

                }
            ).then(response => response.text())
                .then(text => alert(text))
              
                
        } catch (err) {
            console.error(err.message);
        }
    };

    const onReceiverNameChange = e =>{
        setReceiverName(e.target.value.trim());
      
        
    } 
    const onEmailChange = e => {
        setUser({email: e.target.value.trim()})
};
    const onWeightChange = e => {
        setWeight(e.target.value);
        
    }
    const onBoxColorChange = (e) => {
        
        setBoxColor(e.target.value);
        
    }

    const onDestinationCountryChange = (e) =>{
        let id = parseInt(e.target.value)
          
         setCountry({id})
   
        };

     
    return (
        <div className="newShipmentContainer">
            <h1>Add new shipment as guest: </h1>
            <br></br>
            <Form onSubmit={onSubmitForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={onEmailChange} required/>
                    </Form.Group>
                    <div>
                        <Form.Label>Receiver name : </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={onReceiverNameChange} required/>
                    </div>
                    <div>
                        <Form.Label>Weight (kg): </Form.Label>
                        <Form.Control type="number" placeholder="Enter weight" onChange={onWeightChange} required/>
                    </div>
                    <div>
                        <Form.Label>Box colour: </Form.Label>
                        <Form.Control type="color" value={boxcolor}  onChange={onBoxColorChange} required/>
                    </div>
                    
                    <div>
                        <label>Destination country: </label>
                    <br></br>
    
                        
                        <select onChange={onDestinationCountryChange} required>
                        
                            {countries.map(name => (<option key={name.id} value={name.id} required>{name.countryName}</option>))}
                            </select> 
                    </div>
                    <br></br>
                    <div>
                        <Button type="submit" variant="outline-danger">Add shipment</Button>
                    </div>
                </Form>
            <br></br>
            <Link to="/"> <button>Go back</button></Link>
        </div>
    );
}
export default AddShipmentGuest;