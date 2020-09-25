import React, { useState, useEffect } from 'react'
import {READ, UPDATE, READDEFAULT} from '../../api/CRUD';

const SpecificShipment = ({ shipmentId }) => {

    //Comment out shipmentId and pass in id as props
    //For development use only
    shipmentId = 1;

    const [shipment, setShipment] = useState({});
    const [countryList, setCountryList] = useState([]);

    //const statusList = ["CREATED", "RECIEVED", "INTRANSIT", "COMPLETED", "CANCELLED"]

    useEffect(() => {
        
        READ(`/shipments/${shipmentId}`).then(res => setShipment(res.data))
            .catch(err => console.log(err))
        
        READDEFAULT('/settings/countries').then(res => setCountryList(res.data))
            .catch(err => console.log(err));
        
            
    }, [shipmentId])

    const onShipmentChanged = e => {
        const {name, value} = e.target;
        setShipment(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log(shipment);

        //Passing ID recieves error 400 in api endpoint
        const body = {boxcolor: shipment.boxcolor, country: {id: shipment.country.id}, shipmentStatus: shipment.shipmentStatus, receiverName: shipment.receiverName}

        await UPDATE(`/shipments/${shipmentId}`, body).then(res => console.log(res))
                .catch(err=> console.log(err));
        
    }

    // const printStatusList = countryList.map((status, index) => (<option key={status} value={index}>{status}</option>))
    const printCountryList = countryList.map(country => (<option key={country.id} value={country.id}>{country.countryName}</option>))
    // const statusList = ["CREATED", "RECIEVED", "INTRANSIT", "COMPLETED", "CANCELLED"]
    return (
        <div className="container">
            <br/><br/>

            <form onSubmit={onSubmitForm}>
                <label>Receiver</label>
                <input type="text" name="receiverName" onChange={onShipmentChanged} value={shipment.receiverName}/>
                <br/><br/>
                <label>BoxColor</label>
                <input type="text" name="boxcolor" onChange={onShipmentChanged} value={shipment.boxcolor}/>
                <br/><br/>
                <label>Weight</label>
                <input type="number" name="weight" onChange={onShipmentChanged} value={shipment.weight}/>
                <br/><br/>
                
                <label>Shipment status</label>
                <select name="shipmentStatus" onChange={onShipmentChanged}>
                    {/* {printStatusList} */}
                    <option key="CREATED" value="CREATED">CREATED</option>
                    <option key="RECIEVED" value="RECIEVED">RECIEVED</option>
                    <option key="INTRANSIT" value="INTRANSIT">INTRANSIT</option>
                    <option key="COMPLETED" value="COMPLETED">COMPLETED</option>
                    <option key="CANCELLED" value="CANCELLED">CANCELLED</option>
                </select>
                <br/><br/>
                <label>Country</label>
                <select name="country" onChange={onShipmentChanged}>
                    {printCountryList}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SpecificShipment;