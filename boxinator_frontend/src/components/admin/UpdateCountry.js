import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {Form, FormLabel, Table} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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


    const updateCountries = async (e) => {
        e.preventDefault();
        const body = {multiplyerNumber: country.multiplyerNumber, countryName: country.countryName, countryCode: country.countryCode};
        if(!errorName && !errorCode && !errorMultiplyer){

            await axios.put(`http://localhost:8080/api/settings/countries/${country.id}`, body, {headers: {'Authorization': localStorage.getItem('token')}})
                .then(res => {
                    alert(`${country.countryName} has been updated`)
                    history.push("/adminMainPage");
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }else{
            alert("INVALID INPUT")
        }
    }
    const onCountryNameChanged = e => {
        // let matches = e.target.value.match(/[a-zA-Z]+/g);
        let letters = /^[A-Za-z]+$/;
        if (e.target.value.match(letters) && e.target.value.length > 2 ) {
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
        if (e.target.value.match(letters) && e.target.value.length >= 2 ) {
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
        let matches = e.target.value.match(/^[1-9]\d*$/g );

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
        <>
        <form className={classes.root} noValidate autoComplete="off">
        <div style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
          {/* <TextField label="" id="standard-size-normal" value={country.countryName} onChange={onCountryChange} />
          <TextField label="" id="standard-size-normal" value={country.countryCode}  onChange={onCountryChange}/>
          <TextField label="" id="standard-size-normal" value={country.multiplyerNumber} onChange={onCountryChange} />
          <br/> */}
          <FormLabel>Country Name</FormLabel>
          <br/>
          <TextField helperText={helperName} error={errorName} label="" id="outlined-size-small"  variant="outlined" size="small" name="countryName"  value={country.countryName} 
          placeholder={country.countryName} onChange={onCountryNameChanged} required/>
          <br/>
          <FormLabel>Country Code</FormLabel>
          <br/>

          <TextField helperText={helperCode} error={errorCode} label="" id="outlined-size-small" variant="outlined" size="small" name="countryCode" value={country.countryCode}
           placeholder={country.countryCode}  onChange={onCountryCodeChanged} required/>
          <br/>
          <FormLabel>Country Multiplyer</FormLabel>
          <br/>

          <TextField helperText={helperMultiplyer} error={errorMultiplyer} label="" id="outlined-size-small" variant="outlined" size="small" name="multiplyerNumber" value={country.multiplyerNumber} 
           placeholder={country.multiplyerNumber} onChange={onCountryMultiplyerChanged} required/>
          <br/>
             <Button type="submit" variant="contained" color="primary" onClick={updateCountries}>Update country</Button>
        </div>
       
      </form>
             <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
    
</>

        // <div key={country.id}>

            
        //     <Form  onSubmit={uppdateCountries}>
        //         {/* <input type="text"  name="code" value={countryCode} onChange={onCodeChange}/>
        //         <input type="text"  name="name" value={countryName} onChange={onNameChange}/>*/}
        //         <input type="number" name="multiplyerNumber" value={country.multiplyerNumber} onChange={onCountryChange}/>
        //         <input type="text" name="countryName" value={country.countryName} onChange={onCountryChange}/>
        //         <input type="text" name="countryCode" value={country.countryCode} onChange={onCountryChange}/>
        //         <Button type="submit" color="primary">update</Button>
        //     </Form>

        //     <br></br>
        //     <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
        //     <Link to="/addCountry"><Button variant="contained" color="primary">Add new country</Button></Link>
        // </div>
    )
}
export default UpdateCountry;