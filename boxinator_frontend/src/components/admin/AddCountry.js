import React, { useState} from "react";
import {Form} from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import {formValid, isPositiveNumber, validateName} from "../validation/validation";
import ShipmentDialog from "../Dialog/ShipmentDialog";
import AddCountryDialog from "../Dialog/AddCountryDialog";


const AddCountry = (props) => {
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState();
    const [multiplyerNumber, setNumber] = useState();
    const [errorMessage, setErrorMessage] = useState({countryName:'', multiplyerNumber:'', countryCode:''});
    const formFields = { countryName: countryName, countryCode: countryCode, multiplyerNumber:multiplyerNumber};

    const onSubmitForm = async e => {
        e.preventDefault();
        if(formValid(errorMessage, formFields)) {
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
                .then(text => alert(text),  props.history.push("/country")
            )

        } catch (err) {
            console.error(err.message);
        }
        }else{
            alert('Invalid credentials ! Make sure that all the required fields filled');
        }
    };


    const onCountryNameChanged = e =>{
        setCountryName(e.target.value.trim());
        setErrorMessage({countryName: validateName(e.target.value)}) ;
    }

    const onCountryCodeChanged = e => {
        setCountryCode(e.target.value);
        setErrorMessage({countryCode: validateName(e.target.value)}) ;
    }
    const onNumberChanged = e => {
        setNumber(e.target.value);
        setErrorMessage({multiplyerNumber: isPositiveNumber(e.target.value)}) ;
    }

    return (
        <div className="container" >
            <Form onSubmit={onSubmitForm} className="form-container">
                <h1>New country: </h1>
                <br></br>
                <div>
                    <Form.Label>Country name : </Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={onCountryNameChanged} required/>
                    <span className="errorMessage">{errorMessage.countryName}</span>
                </div>
                <div>
                    <Form.Label>Country Code </Form.Label>
                    <Form.Control type="text" placeholder="Enter code" onChange={onCountryCodeChanged} required/>
                    <span className="errorMessage">{errorMessage.countryCode}</span>
                </div>
                <div>
                    <Form.Label>Multiplying Number </Form.Label>
                    <Form.Control type="number"  onChange={onNumberChanged} required/>
                    <span className="errorMessage">{errorMessage.multiplyerNumber}</span>
                </div>
                <br></br>

                <br></br>
                <div>
                    <AddCountryDialog countryCode={countryCode} multiplyerNumber={multiplyerNumber} countryName={countryName} onSubmitForm={onSubmitForm}  />
                </div>
            </Form>

        </div>
    );
}
export default withRouter(AddCountry);