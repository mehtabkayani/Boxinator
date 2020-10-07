import React, { useState, useEffect } from 'react'
import {GET, PUT, GETDEFAULT} from '../../api/CRUD';
import {useParams} from "react-router";
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AdminUpdateShipmentDialog from '../Dialog/AdminUpdateShipmentDialog';

import {validateName, isPositiveNumber, formValid} from "../validation/validation";
import {Form} from "react-bootstrap";

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

const SpecificShipment = () => {
    const classes = useStyles();
    const {id} = useParams();
    const history = useHistory();
    const [shipment, setShipment] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState({});
    const [errorMessage, setErrorMessage] = useState({receiverName:'', weight:''});
    const formFields = { receiverName: shipment.receiverName, weight: shipment.weight}

    useEffect(() => {
        
        GET(`/shipments/${id}`).then(res => {
            setShipment(res.data);
            setCountry(res.data.country);
        }).catch(err => console.log(err))
        
        GETDEFAULT('/settings/countries').then(res => setCountryList(res.data))
            .catch(err => console.log(err));


    }, [])

    const onShipmentChanged = e => {
        const { name, value } = e.target;
        setShipment(prevState => ({ ...prevState, [name]: value }));

        switch (name) {
            case "receiverName":
                setErrorMessage({receiverName: validateName(value)}) ;

                break;
            case "weight":
                setErrorMessage({weight: isPositiveNumber(value)}) ;
                break;

            default:
                break;
        }
    }
    const onCountryChanged = e => {
        const {name, value} = e.target;
        setCountry(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log(shipment);

        const body = {boxcolor: shipment.boxcolor, country, shipmentStatus: shipment.shipmentStatus, receiverName: shipment.receiverName, weight: shipment.weight}
        if(formValid(errorMessage, formFields)) {
        await PUT(`/shipments/${id}`, body).then(res => {
            history.push("/adminMainPage") 
        }).catch(err=> console.log(err));
        }else{
            alert('Invalid credentials ! Make sure that all the required fields filled');
        }
    }

    const handleDelete = async () => {
        let result = window.confirm(`Do you want to delete the shipment?`);

        if (result) {
            await axios.delete(`http://localhost:8080/api/shipments/${shipment.id}`,{ headers: {'Authorization': localStorage.getItem('token')} })
       
         .then(res => {
             console.log(res);
             alert(`You have deleted the shipment`)
             history.push("/adminMainPage")
            })
            .catch(err => {
                console.log("Error: ", err);
            }) 
        }

    }

    const printCountryList = countryList.map(country => (<MenuItem key={country.id} value={country.id}>{country.countryName}</MenuItem>))
    return (
        <div>
            <br></br>
            <Link to="/adminMainPage" className="floatLeftBtn"><Button variant="outlined" color="primary">All shipments</Button></Link>
        <div className="container">
            <br /><br />

            <Form onSubmit={onSubmitForm} className="form-container">
               <h1>Update shipment</h1>
                <div>
                    <Form.Label>Receiver name : </Form.Label>
                    <Form.Control type="text" name="receiverName" placeholder="Enter name" onChange={onShipmentChanged} required value={shipment.receiverName}/>
                    <span className="errorMessage">{errorMessage.receiverName}</span>
                </div>
                <div>
                    <Form.Label>Weight (kg): </Form.Label>
                    <Form.Control type="number" name="weight" placeholder="Enter weight" onChange={onShipmentChanged} required value={shipment.weight} />
                    <span className="errorMessage">{errorMessage.weight}</span>
                </div>
                <div>
                    <Form.Label>Box colour: </Form.Label>
                    <Form.Control type="color" name="boxcolor"  onChange={onShipmentChanged} required value={shipment.boxcolor}/>
                </div>

                         <FormControl className={classes.formControl}>
                            <InputLabel id="select-label">{shipment.shipmentStatus}</InputLabel>
                            <Select
                            name="shipmentStatus"
                            labelId="select-label"
                            id="account-select"
                            value={shipment.shipmentStatus}
                            onChange={onShipmentChanged}
                            >
                            <MenuItem key="CREATED" value={"CREATED"}>Created</MenuItem>
                            <MenuItem key="RECIEVED" value={"RECEIVED"}>Received</MenuItem>
                            <MenuItem key="INTRANSIT" value={"INTRANSIT"}>Intransit</MenuItem>
                            <MenuItem key="COMPLETED" value={"COMPLETED"}>Completed</MenuItem>
                            <MenuItem key="CANCELLED" value={"CANCELLED"}>Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                <br /><br />
                <FormControl className={classes.formControl}>
                            <InputLabel id="select-label">{country.countryName}</InputLabel>
                            <Select
                            name="id"
                            labelId="select-label"
                            id="country-select"
                            value={country.id}
                            onChange={onCountryChanged}
                            >
                    {printCountryList}
                         
                            </Select>
                        </FormControl>

                <br/>
                <div style={{display: 'flex'}}>
                    <AdminUpdateShipmentDialog onSubmitForm={onSubmitForm} receiverName={shipment.receiverName} weight={shipment.weight} boxcolor={shipment.boxcolor} countryName={country.countryName}/>

                    <Button onClick={handleDelete} variant="outlined" color="secondary" autoFocus>Delete</Button>
                </div>
            </Form>
        </div>
        </div>
    );
}

export default SpecificShipment;