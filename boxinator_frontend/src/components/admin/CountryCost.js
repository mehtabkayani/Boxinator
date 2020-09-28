import React, {useEffect, useState} from "react";
import { Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from "axios";

const CountryCost = () => {
    const [countries, setCountryList] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:8080/api/settings/countries`)
            .then(res => {
                console.log(res.data);
                setCountryList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    const rows = countries.map(country => (
        <tr key={countries.id}>
            <td>{country.countryName}</td>
            <td>{country.multiplyerNumber}</td>
        </tr>
    ))
    return(
        <div>
            <Table>
                <thead>
                <th>Country</th>
                <th>Multiplier</th>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <br></br>
            <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
            <Link to="/addCountry"><Button variant="contained" color="primary">Add new country</Button></Link>
        </div>
    )
}
export default CountryCost;