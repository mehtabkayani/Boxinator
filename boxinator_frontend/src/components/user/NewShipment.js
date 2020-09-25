import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Select from 'react-select';
import {Button, Form} from "react-bootstrap";
import axios from "axios";

const NewShipment = () => {
    const [receiverName, setReceiverName] = useState('');
    const [weight, setWeight] = useState();
    const [boxcolor, setBoxColor] = useState("#050505");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({})


    useEffect(()=>{
        axios.get('http://localhost:8080/api/settings/countries ', { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                setCountries(res.data);
                console.log(res.data[0].id)
                setCountry({id: res.data[0].id})
            })
            .catch(err => {
                console.log(err);
            })
    },[])

  

    const onSubmitForm = async e => {
        console.log(receiverName)
        console.log(weight)
        console.log(boxcolor)
        console.log(country)
        e.preventDefault();
        try {
            const body = {receiverName, weight, boxcolor, country};
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


        const onReceiverNameChanged = e =>{
            setReceiverName(e.target.value.trim());
        } 

        const onWeightChanged = e => {
            setWeight(e.target.value);
        }
        const onBoxColorChanged = (e) => {
            setBoxColor(e.target.value);
        }
    
        const onDestinationCountryChanged = (e) =>{
            let id = parseInt(e.target.value)
             setCountry({id})
            };

    return (
        <div className="newShipmentContainer">
            <h1>New shipment: </h1>
            <br></br>
            <Form onSubmit={onSubmitForm}>
            <div>
                        <Form.Label>Receiver name : </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={onReceiverNameChanged} required/>
                    </div>
                    <div>
                        <Form.Label>Weight (kg): </Form.Label>
                        <Form.Control type="number" placeholder="Enter weight" onChange={onWeightChanged} required/>
                    </div>
                    <div>
                        <Form.Label>Box colour: </Form.Label>
                        <Form.Control type="color" value={boxcolor}  onChange={onBoxColorChanged} required/>
                    </div>
                    <div>
                        <label>Destination country: </label>
                    <br></br>
                        
                        <select onChange={onDestinationCountryChanged} required>
                        
                            {countries.map(name => (<option key={name.id} value={name.id} required>{name.countryName}</option>))}
                            </select> 
                    </div>
                    <br></br>

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