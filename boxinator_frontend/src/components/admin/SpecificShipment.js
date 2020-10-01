import React, { useState, useEffect } from 'react'
import {GET, PUT, GETDEFAULT} from '../../api/CRUD';
import {useParams} from "react-router";
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AdminUpdateShipmentDialog from '../Dialog/AdminUpdateShipmentDialog';

import {validateName, isPositiveNumber, formValid} from "../validation/validation";
import {Form} from "react-bootstrap";

const SpecificShipment = () => {

    const {id} = useParams();
    const history = useHistory();
    //Comment out shipmentId and pass in id as props
    //For development use only
    // shipmentId = 78;

    const [shipment, setShipment] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState({});
    const [errorMessage, setErrorMessage] = useState({receiverName:'', weight:''});
    const formFields = { receiverName: shipment.receiverName, weight: shipment.weight}

    //const statusList = ["CREATED", "RECIEVED", "INTRANSIT", "COMPLETED", "CANCELLED"]

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

        //Passing ID recieves error 400 in api endpoint
        const body = {boxcolor: shipment.boxcolor, country, shipmentStatus: shipment.shipmentStatus, receiverName: shipment.receiverName, weight: shipment.weight}
        if(formValid(errorMessage, formFields)) {
        await PUT(`/shipments/${id}`, body).then(res => {
            // alert("Shipment has been updated!")
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

    // const printStatusList = countryList.map((status, index) => (<option key={status} value={index}>{status}</option>))
    const printCountryList = countryList.map(country => (<option key={country.id} value={country.id}>{country.countryName}</option>))
    // const statusList = ["CREATED", "RECIEVED", "INTRANSIT", "COMPLETED", "CANCELLED"]
    return (
        <div className="container">
            <br /><br />

            <form onSubmit={onSubmitForm}>
                <label>Receiver</label>
                <br />
                <input type="text" name="receiverName" onChange={onShipmentChanged} value={shipment.receiverName} />
                <br />
                <br />
                <span className="errorMessage">{errorMessage.receiverName}</span>
                <br /><br />
                <label>BoxColor</label>
                <br />
                <input type="color" name="boxcolor" onChange={onShipmentChanged} value={shipment.boxcolor} />
                <br />
                <br />
                <label>Weight</label>
                <br />
                <input type="number" name="weight" onChange={onShipmentChanged} value={shipment.weight} />
                <br />
                <br />
                <span className="errorMessage">{errorMessage.weight}</span>
                <br /><br />

                <label>Shipment status</label>
                <select name="shipmentStatus" onChange={onShipmentChanged} value={shipment.shipmentStatus}>
                    <option key="CREATED" value="CREATED">CREATED</option>
                    <option key="RECIEVED" value="RECIEVED">RECIEVED</option>
                    <option key="INTRANSIT" value="INTRANSIT">INTRANSIT</option>
                    <option key="COMPLETED" value="COMPLETED">COMPLETED</option>
                    <option key="CANCELLED" value="CANCELLED">CANCELLED</option>
                </select>
                <br /><br />
                <label>Country</label>
                <select name="id" onChange={onCountryChanged} value={country.id}>
                    {printCountryList}
                </select>
                <br/>
                
            </form>
            {/* <Button type="submit" onClick={onSubmitForm} variant="outlined" color="primary" autoFocus>Save</Button> */}
           <div style={{display: 'flex'}}>
            <AdminUpdateShipmentDialog onSubmitForm={onSubmitForm} receiverName={shipment.receiverName} weight={shipment.weight} boxcolor={shipment.boxcolor} countryName={country.countryName}/>

            <Button onClick={handleDelete} variant="outlined" color="secondary" autoFocus>Delete</Button>
           </div>


        </div>
    );
}

export default SpecificShipment;