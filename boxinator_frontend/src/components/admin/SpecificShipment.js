import React, { useState, useEffect } from 'react'
import {GET, PUT, GETDEFAULT} from '../../api/CRUD';
import {useParams} from "react-router";
import {useHistory} from 'react-router-dom'
import axios from 'axios';

const SpecificShipment = () => {

    const {id} = useParams();
    const history = useHistory();
    //Comment out shipmentId and pass in id as props
    //For development use only
    // shipmentId = 78;

    const [shipment, setShipment] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState({});

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

        await PUT(`/shipments/${id}`, body).then(res => {
            alert("Shipment has been updated!")
            history.push("/adminMainPage") 
        }).catch(err=> console.log(err));
        
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
                <input type="text" name="receiverName" onChange={onShipmentChanged} value={shipment.receiverName} />
                <br /><br />
                <label>BoxColor</label>
                <input type="color" name="boxcolor" onChange={onShipmentChanged} value={shipment.boxcolor} />
                <br /><br />
                <label>Weight</label>
                <input type="number" name="weight" onChange={onShipmentChanged} value={shipment.weight} />
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
    
                <button type="submit">Submit</button>
                
            </form>
            <button onClick={handleDelete}>Delete</button>

        </div>
    );
}

export default SpecificShipment;