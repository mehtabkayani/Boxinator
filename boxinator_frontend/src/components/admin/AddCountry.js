import React, { useState} from "react";
import {Button, Form} from "react-bootstrap";


const AddCountry = () => {
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState();
    const [multiplyerNumber, setNumber] = useState();

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {countryName: countryName, countryCode: countryCode, multiplyerNumber: multiplyerNumber};
            await fetch(
                "http://localhost:8080/api/settings/countries",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': localStorage.getItem('token')
                    },
                    body: JSON.stringify(body)

                }
            ).then(response => response.text())
                .then(text => alert(text))

        } catch (err) {
            console.error(err.message);
        }
    };


    const onCountryNameChanged = e =>{
        setCountryName(e.target.value.trim());
    }

    const onCountryCodeChanged = e => {
        setCountryCode(e.target.value);
    }
    const onNumberChanged = e => {
        setNumber(e.target.value);
    }

    return (
        <div >
            <h1>New shipment: </h1>
            <br></br>
            <Form onSubmit={onSubmitForm}>
                <div>
                    <Form.Label>Country name : </Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={onCountryNameChanged} required/>
                </div>
                <div>
                    <Form.Label>Country Code </Form.Label>
                    <Form.Control type="text" placeholder="Enter code" onChange={onCountryCodeChanged} required/>
                </div>
                <div>
                    <Form.Label>Multiplying Number </Form.Label>
                    <Form.Control type="number"  onChange={onNumberChanged} required/>
                </div>
                <br></br>

                <br></br>
                <div>
                    <Button variant="outline-danger" type="submit">Add country</Button>
                </div>
            </Form>

        </div>
    );
}
export default AddCountry;