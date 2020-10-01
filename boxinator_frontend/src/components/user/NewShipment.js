import React, {useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
import Select from 'react-select';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import ShipmentDialog from "../Dialog/ShipmentDialog";

const NewShipment = () => {
    const [receiverName, setReceiverName] = useState('');
    const [weight, setWeight] = useState();
    const [boxcolor, setBoxColor] = useState("#050505");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({})
    const [countryName, setCountryName] = useState("")
    const history = useHistory();
    // const [shipment, setShipment] = useState({receiverName: "",weight: 0,boxcolor: "",country:{}});


    useEffect(()=>{
        axios.get('http://localhost:8080/api/settings/countries ', { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                setCountries(res.data);
                console.log(res.data[0].id)
                setCountry({id: res.data[0].id})
                setCountryName(res.data[0].countryName)
            })
            .catch(err => {
                console.log(err);
            })
    },[])

  

    const onSubmitForm = async e => {
        
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
            .then(history.push("/mainPage"))
                // .then(text => alert(text))

        } catch (err) {
            console.error(err.message);
        }
    };

    const getCountryName = async(id) => {
    await axios.get(`http://localhost:8080/api/settings/country/${id}`)
         .then(res=>{
             console.log(res.data);
             setCountryName(res.data.countryName)
         })
         .catch(err => {
             console.log(err);
         })
 

    }
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
             getCountryName(id)
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
                    {/* <Button variant="outline-danger" type="submit">Add shipment</Button> */}
    
                    <ShipmentDialog receiverName={receiverName} weight={weight} boxcolor={boxcolor} countryName={countryName} onSubmitForm={onSubmitForm}/>
                </div>
            </Form>
            <br></br>
            <Link to="/mainPage"> <Button variant="secondary">Go back</Button></Link>
        </div>
    );
}
export default NewShipment;