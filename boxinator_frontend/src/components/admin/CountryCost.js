import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const CountryCost = () => {
    const [countries, setCountryList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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


    const url = "/updateCountry"

    function createData(id, countryName, countryCode, multiplyerNumber) {

        return { id, countryName, countryCode, multiplyerNumber};
    }

    const rows = countries.map(country => (

        createData(country.id, country.countryName,country.countryCode, country.multiplyerNumber)

    ));


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
    });
    const classes = useStyles();
    const columns = [
        { id: 'id', label: '#ID', minWidth: 170 },
        { id: 'countryName', label: 'Country Name', minWidth: 170 },
        { id: 'countryCode', label: 'Country Code', minWidth: 100 },
        {
            id: 'multiplyerNumber',
            label: 'Multiplyer number',
            minWidth: 170,
            align: 'right'
        }
    ];

    // const rows = countries.map(country => (

    //     <tr key={country.id}>
    //         <Link to={`/updateCountry/${country.id}`}>{country.countryName}</Link>
    //         <td>{country.multiplyerNumber}</td>
    //     </tr>
    // ));
    return(

        <>
        <h1>List of all countries</h1>
                   <Paper className={classes.root}>
       
                       <TableContainer className={classes.container}>
                           <Table stickyHeader aria-label="sticky table">
                               <TableHead>
                                   <TableRow>
                                       {columns.map((column) => (
                                           <TableCell
                                               key={column.id}
                                               align={column.align}
                                               style={{minWidth: column.minWidth}}
                                           >
                                               {column.label}
                                           </TableCell>
                                       ))}
                                   </TableRow>
                               </TableHead>
                               <TableBody>
                                   {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                       return (
                                           <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                               {columns.map((column) => {
                                                   const value = row[column.id];
                                                   return (
                                                       <TableCell key={column.id} align={column.align} style={{backgroundColor: value, color: value}}>
                                                           {column.format && typeof value === 'number' ? column.format(value) : value}
                                                       </TableCell>
       
                                                   );
                                               })}
                                               <Link to={`/updateCountry/${row.id}`}>Update</Link>
                                           </TableRow>
                                       );
                                   })}
                               </TableBody>
                           </Table>
                       </TableContainer>
                       <TablePagination
                           rowsPerPageOptions={[10, 25, 100]}
                           component="div"
                           count={rows.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           onChangePage={handleChangePage}
                           onChangeRowsPerPage={handleChangeRowsPerPage}
                       />
                   </Paper>
               </>
        // <div>

        //     <Table>
        //         <thead>
        //         <th>Country</th>
        //         <th>Multiplier</th>
        //         </thead>
        //         <tbody>{rows}</tbody>
        //     </Table>
        //     <br></br>
        //     <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
        //     <Link to="/addCountry"><Button variant="contained" color="primary">Add new country</Button></Link>
        // </div>
    )
}
export default CountryCost;