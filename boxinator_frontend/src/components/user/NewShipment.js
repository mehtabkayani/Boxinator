import React from "react";
import {Link} from "react-router-dom";
import Select from 'react-select';
import {Button, Form} from "react-bootstrap";

const NewShipment = () => {
    const options = [
        {value: 'sweden', label: 'Sweden'},
        {value: 'Denmark', label: 'Denmark'},
        {value: 'norway', label: 'norway'}
    ]
    return (
        <div className="newShipmentContainer">
            <h1>New shipment: </h1>
            <br></br>
            <Form>
                <div>
                    <Form.Label>Receiver name : </Form.Label>
                    <Form.Control type="text" placeholder="Enter name"/>
                </div>
                <div>
                    <Form.Label>Weight (kg): </Form.Label>
                    <Form.Control type="number" placeholder="Enter weight"/>
                </div>
                <div>
                    <Form.Label>Box colour: </Form.Label>
                    <Form.Control type="color"/>
                </div>
                <div>
                    {/* Maybe have registered countries to chose from */}
                    <label>Destination country: </label>
                    <Select options={options}/>
                </div>
                <br></br>
                <div>
                    <Button variant="outline-danger">Add shipment</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/mainPage"> <Button variant="secondary">Go back</Button></Link>
        </div>
    );
}
export default NewShipment;