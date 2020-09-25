import React, {useEffect, useState} from "react";
import { Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from "axios";

const CountryCost = () => {
    const [countryList, setCountryList] = useState([]);


    const fetchCountries = async () => {

    }
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
    const body = {multiplyerNumber: countryList.multiplyerNumber};
    const uppdateCountries = async () => {
        await axios.put(`http://localhost:8080/api/countries/${countryList.id}`,  { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }
    const onCountryChange = ev => setCountryList(ev.target.value.trim());
    const printCountryList = countryList.map(country => (

        <tr key={country.id}>
           <td> {country.countryName}</td>
            <td><input type="text" value={country.multiplyerNumber} onChange={onCountryChange}/></td>
        </tr>
       ))
    return(
        <div>
            <Table>
                <thead>
                <th>Country</th>
                <th>Multiplier</th>
                </thead>
                <tbody>

                 {printCountryList}

                </tbody>
                <Button onClick={uppdateCountries}>Update</Button>
            </Table>
            <br></br>
            <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
            <Link to="/addCountry"><Button variant="contained" color="primary">Add new country</Button></Link>
        </div>
    )
}
export default CountryCost;