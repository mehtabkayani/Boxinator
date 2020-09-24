import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SpecificShipment = ({shipmentId}) => {

    const [shipment, setShipment] = useState({});
    //Comment out shipmentId and pass in id as props
    //For development use only
    shipmentId = 1;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/shipments/${shipmentId}`, {headers: {'Authorization': localStorage.getItem('token')}})
            .then(res => {
                console.log(res.data);
                setShipment(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [shipmentId])
    
    
    return(
        <div>
            <h2>Specific shipment</h2>

        </div>
    );
}

export default SpecificShipment;