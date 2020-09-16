import React from "react";
import {Link} from "react-router-dom";
import "../../style/style.css"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const MainPage = () => {
    return (
        <div className="shipmentsTable">
            <h1>Welcome to the Main page</h1>
            <p>Here can you see your shipments or add a new shipment by clicking on the button</p>
            <br></br>
            <Table striped bordered hover variant="dark" >
                <thead>
                <tr>
                    <th>Receiver name</th>
                    <th>Weight (kg)</th>
                    <th>Box colour</th>
                    <th>Destination Country</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                </tr>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                </tr>
                </tbody>
            </Table>
            <br></br>
           <Link to="/newShipment"><Button variant="outline-secondary">Add new shipment</Button></Link>
        </div>
    );
}
export default MainPage;