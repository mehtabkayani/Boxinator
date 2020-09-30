import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {Form, Table} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';

const UpdateCountry = () => {
    const {id} = useParams();
    const [country, setCountry] = useState({});
    const history = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/settings/country/${id}`)
            .then(res=>{
                console.log(res.data);
                setCountry(res.data)
            })
            .catch(err => {
                console.log(err);
            })

    }, [id])


    const uppdateCountries = async (e) => {
        e.preventDefault();
        const body = {multiplyerNumber: country.multiplyerNumber, countryName: country.countryName, countryCode: country.countryCode};
        await axios.put(`http://localhost:8080/api/settings/countries/${country.id}`, body, {headers: {'Authorization': localStorage.getItem('token')}})
            .then(res => {
                alert(`${country.countryName} has been updated`)
                history.push("/adminMainPage");
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onCountryChange = e => {
        const {name, value} = e.target;
        setCountry(prevState => ({...prevState, [name]: value}));
    };
  //  const onCountryChange = ev => setCountry(ev.target.value.trim());

    console.log(country);
    console.log();
    return (
        <div key={country.id}>

            
            <Form  onSubmit={uppdateCountries}>
                {/* <input type="text"  name="code" value={countryCode} onChange={onCodeChange}/>
                <input type="text"  name="name" value={countryName} onChange={onNameChange}/>*/}
                <input type="number" name="multiplyerNumber" value={country.multiplyerNumber} onChange={onCountryChange}/>
                <input type="text" name="countryName" value={country.countryName} onChange={onCountryChange}/>
                <input type="text" name="countryCode" value={country.countryCode} onChange={onCountryChange}/>
                <Button type="submit" color="primary">update</Button>
            </Form>

            <br></br>
            <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
            <Link to="/addCountry"><Button variant="contained" color="primary">Add new country</Button></Link>
        </div>
    )
}
export default UpdateCountry;