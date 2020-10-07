import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {Form, FormLabel, Table} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CountryDialog from '../Dialog/CountryDialog';
import { GETDEFAULT, PUT } from "../../api/CRUD";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200


        },
    },
}));

const UpdateCountry = () => {
    const classes = useStyles();
    const {id} = useParams();
    const [country, setCountry] = useState({});
    const history = useHistory();
    const [helperName, setHelperName] = useState("");
    const [helperCode, setHelperCode] = useState("");
    const [helperMultiplyer, setHelperMultiplyer] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [errorMultiplyer, setErrorMultiplyer] = useState(false);

    useEffect(() => {
        // axios.get(`http://localhost:8080/api/settings/country/${id}`)
        //     .then(res => {
        //         console.log(res.data);
        //         setCountry(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
            GETDEFAULT(`/settings/country/${id}`).then(res => setCountry(res.data)).catch(err => console.log());
    }, [])


    const updateCountries = async (e) => {
        e.preventDefault();
        const body = {
            multiplyerNumber: country.multiplyerNumber,
            countryName: country.countryName,
            countryCode: country.countryCode
        };
        if (!errorName && !errorCode && !errorMultiplyer) {
                await PUT(`/settings/countries/${country.id}`, body)
                        .then(res => history.push("/country")).catch(err => console.log(err));
        } else {
            alert("INVALID INPUT")
        }
    }
    const onCountryNameChanged = e => {
        let letters = /^[A-Za-z]+$/;
        if (e.target.value.match(letters) && e.target.value.length > 2) {
            setHelperName('');
            setErrorName(false);
        } else {
            setHelperName('Must at least be 2 characters long and only contain letters');
            setErrorName(true);
        }
        const {name, value} = e.target;
        setCountry(prevState => ({...prevState, [name]: value}));


    };

    const onCountryCodeChanged = e => {
        let letters = /^[A-Za-z]+$/;
        if (e.target.value.match(letters) && e.target.value.length >= 2) {
            setHelperCode('');
            setErrorCode(false);
        } else {
            setHelperCode('Country code must be at least be 2 characters long and only contain letters');
            setErrorCode(true);
        }
        const {name, value} = e.target;
        setCountry(prevState => ({...prevState, [name]: value}));


    };

    const onCountryMultiplyerChanged = e => {
        let matches = e.target.value.match(/^[1-9]\d*$/g);

        if (e.target.value.length >= 1 && matches) {
            setHelperMultiplyer('');
            setErrorMultiplyer(false);
        } else {
            setHelperMultiplyer('Must be a positive number');
            setErrorMultiplyer(true);
        }

        const {name, value} = e.target;
        setCountry(prevState => ({...prevState, [name]: value}));
    };


    return (
        <div>
            <Link to="/country" className="floatLeftBtn"><Button variant="outlined" color="primary">All countries</Button></Link>
            <br></br>
            <div className="container">
                <h1>Update {country.countryName}</h1>
                <Form noValidate autoComplete="off" className="form-container">
    
                        <FormLabel>Country Name</FormLabel>
                        <br/>
                        <TextField helperText={helperName} error={errorName} label="" id="outlined-size-small"
                                   variant="outlined" size="small" name="countryName" value={country.countryName}
                                   placeholder={country.countryName} onChange={onCountryNameChanged} required/>
                        <br/>
                        <FormLabel>Country Code</FormLabel>
                        <br/>

                        <TextField helperText={helperCode} error={errorCode} label="" id="outlined-size-small"
                                   variant="outlined" size="small" name="countryCode" value={country.countryCode}
                                   placeholder={country.countryCode} onChange={onCountryCodeChanged} required/>
                        <br/>
                        <FormLabel>Country Multiplyer</FormLabel>
                        <br/>

                        <TextField helperText={helperMultiplyer} error={errorMultiplyer} label=""
                                   id="outlined-size-small" variant="outlined" size="small" name="multiplyerNumber"
                                   value={country.multiplyerNumber}
                                   placeholder={country.multiplyerNumber} onChange={onCountryMultiplyerChanged}
                                   required/>
                        <br/>
                        <CountryDialog countryName={country.countryName} updateCountries={updateCountries}/>

                </Form>
            </div>
        </div>

    )
}
export default UpdateCountry;