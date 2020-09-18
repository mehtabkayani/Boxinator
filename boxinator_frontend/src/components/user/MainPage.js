import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../../style/style.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";


const MainPage = () => {
    const [shipments, setShipments]= useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/api/shipments')
            .then(res=>{
                console.log(res);
                setShipments(res.data)
            })
            .catch(err => {
                console.log(err);
            })

    })
    return (
        <div className="shipmentsTable">
            <h1>Welcome to the Main page</h1>
            <br></br>
            <p>Here can you see your shipments or add a new shipment by clicking on the button</p>
            <br></br>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Receiver name</th>
                    <th>Weight (kg)</th>
                    <th>Box colour</th>
                    <th>Destination Country</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {
                        shipments.map(shipment => (
                            <td key={shipment.id}>{shipment.recieverName}</td>
                        ))  }


                </tr>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                    <td>not completed</td>
                </tr>
                </tbody>
            </Table>
            <br></br>
            <Link to="/newShipment"><Button variant="outline-secondary">Add new shipment</Button></Link>
        </div>
    );
}
export default MainPage;