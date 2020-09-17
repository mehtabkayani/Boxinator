import React from "react";
import Table from "react-bootstrap/Table";
import FormControlLabelPlacement from "./FormControlLabelPlacement";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const AdminMainPage = () => {
    return (
        <div className="adminPageContainer">
            <h1>Admin main page : </h1>
            <br></br>
            <Link to="/country"><Button>Change country cost</Button></Link>
            <br></br>
            <Table striped bordered hover variant="dark" >
                <thead>
                <tr>
                    <th>Receiver name</th>
                    <th>Weight (kg)</th>
                    <th>Box colour</th>
                    <th>Destination Country</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                    <td><FormControlLabelPlacement></FormControlLabelPlacement></td>
                </tr>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}
export default AdminMainPage;