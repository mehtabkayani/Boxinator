import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Select from 'react-select';
import {Button, Form} from "react-bootstrap";
import axios from "axios";

const NewShipment = () => {
    const [receiverName, setReceiverName] = useState('');
    const [weight, setWeight] = useState('');
    const [boxColour, setBoxColour] = useState('');
    const [country, setDestinationCountry] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:8080/api/settings/countries ', { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                console.log(res.data);
                setDestinationCountry(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    })

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {receiverName, weight, boxColour,  country};
            await fetch(
                "http://localhost:8080/api/shipment",
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

      const options = country.map(country => (

          <option key={country.id} value={country.countryName} >{country.countryName}</option>

    //{ value: country.countryName , label: country.countryName}
        ))


    const onReceiverNameChange = ev => setReceiverName(ev.target.value.trim());
    const onWeightChange = ev => setWeight(ev.target.value.trim());
    const onBoxColourChange = ev => setBoxColour(ev.target.value.trim());
    const onDestinationCountryChange = ev => setDestinationCountry(ev.target.value.trim());

    return (
        <div className="newShipmentContainer">
            <h1>New shipment: </h1>
            <br></br>
            <Form onSubmit={onSubmitForm}>
                <div>
                    <Form.Label>Receiver name : </Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={onReceiverNameChange}/>
                </div>
                <div>
                    <Form.Label>Weight (kg): </Form.Label>
                    <Form.Control type="number" placeholder="Enter weight" onChange={onWeightChange}/>
                </div>
                <div>
                    <Form.Label>Box colour: </Form.Label>
                    <Form.Control type="color" onChange={onBoxColourChange}/>
                </div>
                <select>
                    {options}
                </select>

             {/*       <div >
                    <label>Destination country: </label>

                    <Select options={options} />
                    </div>*/}

                <br></br>
                <div>
                    <Button variant="outline-danger" type="submit">Add shipment</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/mainPage"> <Button variant="secondary">Go back</Button></Link>
        </div>
    );
}
export default NewShipment;