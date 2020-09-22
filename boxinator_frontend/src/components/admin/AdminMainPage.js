import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import FormControlLabelPlacement from "./FormControlLabelPlacement";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";

const AdminMainPage = () => {
    const [shipments, setShipments]= useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/api/shipments', { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                console.log(res.data);
                setShipments(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    })

    const rows = shipments.map(shipment => (

        <tr key={shipment.id}>
            <td >{shipment.recieverName}</td>
            <td >{shipment.weight}</td>
            <td >{shipment.boxcolor}</td>
            <td >{shipment.creation_date}</td>{/*Fix date format*/}
            <td >{shipment.country.countryName}</td>
            <td><FormControlLabelPlacement></FormControlLabelPlacement></td>{/*Not completed need to be fixed*/}
            <td>{shipment.shipmentCost}</td>

        </tr>
    ));

    return (
        <div className="adminPageContainer">
            <h1>Admin main page : </h1>
            <br></br>
            <Link to="/country"><Button>Change country cost</Button></Link>
            <Link to="/allUsers"><Button>Update user</Button></Link>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Receiver name</th>
                    <th>Weight (kg)</th>
                    <th>Box colour</th>
                    <th>Date</th>
                    <th>Destination Country</th>
                    <th>status</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}
export default AdminMainPage;