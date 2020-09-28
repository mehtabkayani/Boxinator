import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {Form, Table} from "react-bootstrap";
import Button from "@material-ui/core/Button";

const UpdateCountry = ({props, match}) => {
    const {id, name, number, code} = useParams();

    const [multiplayerNumb, setNumber] = useState(number);
    const [countryName, setName] = useState(name);
    const [countryCode, setCode] = useState(code);


    const body = {multiplyerNumber: multiplayerNumb, countryName: countryName, countryCode: countryCode};
    const uppdateCountries = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/settings/countries/${id}`, body, {headers: {'Authorization': localStorage.getItem('token')}})
            .then(res => {
                console.log(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }
    const onCountryChange = ev => setNumber(ev.target.value.trim());
    const onNameChange = ev => setName(ev.target.value.trim());
    const onCodeChange = ev => setCode(ev.target.value.trim());


    console.log({id, number, name});
    console.log(multiplayerNumb);
    return (
        <div>

            <h5>{countryCode}</h5>
            <h5>{countryName}</h5>
            <Form onSubmit={uppdateCountries}>
                {/* <input type="text"  name="code" value={countryCode} onChange={onCodeChange}/>
                <input type="text"  name="name" value={countryName} onChange={onNameChange}/>*/}
                <input type="number" name="number" value={multiplayerNumb} onChange={onCountryChange}/>
                <Button type="submit">update</Button>
            </Form>

            <br></br>
            <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
            <Link to="/addCountry"><Button variant="contained" color="primary">Add new country</Button></Link>
        </div>
    )
}
export default UpdateCountry;