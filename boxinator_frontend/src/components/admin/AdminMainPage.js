import React, {useEffect, useState} from "react";
import FormControlLabelPlacement from "./FormControlLabelPlacement";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {GET} from '../../api/CRUD';
import UpdateIcon from '@material-ui/icons/Update';
import { Tooltip } from '@material-ui/core';

const AdminMainPage = () => {
    const [shipments, setShipments] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const url = "/specificShipment";

    useEffect(() => {

        GET('/shipments').then(res => setShipments(res.data)).catch(err => console.log(err));

        // axios.get('http://localhost:8080/api/shipments', {headers: {'Authorization': localStorage.getItem('token')}})
        //     .then(res => {
        //         // console.log(res.data);
        //         setShipments(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }, [])

    function createData(id, to, country, price, weight, boxcolor, creationDate,status) {

        return { id, to, country, price, weight, boxcolor, creationDate,status };
    }

    const rows = shipments.map(shipment => (

        createData(shipment.id, shipment.receiverName, shipment.country.countryName, shipment.shipmentCost, shipment.weight, shipment.boxcolor, shipment.creation_date, shipment.shipmentStatus)

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
        { id: 'id', label: '#ID', minWidth: 100 },
        { id: 'to', label: 'To', minWidth: 100 },
        { id: 'country', label: 'Country', minWidth: 100 },
        {
            id: 'price',
            label: 'Price',
            minWidth: 100,
            align: 'right'
        },
        {
            id: 'weight',
            label: 'Weight',
            minWidth: 100,
            align: 'right'
        },
        {
            id: 'boxcolor',
            label: 'Boxcolor',
            minWidth: 100,
            align: 'right'
        },
        {
            id: 'creationDate',
            label: 'Creation Date',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
            align: 'right'
        }
    ];
    return (
        <>

            <Link to="/country"><Button>Change country cost</Button></Link>
            <Link to="/allUsers"><Button>View users</Button></Link>
            <Link to="/addCountry"><Button>Add new country</Button></Link>
            <Link to="/newShipment"><Button>Add new shipment</Button></Link>
            <h1>All Shipments</h1>
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
                                                      {column.label === 'Price' ? `${value} kr` : (column.label === 'Weight' ? `${value} kg` : value) }
                                                </TableCell>

                                            );
                                        })}
                                        <Link to={`/specificShipment/${row.id}`}>
                                    <Tooltip title="Update"><UpdateIcon color="primary"></UpdateIcon></Tooltip>
                                    </Link>

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
    );
}
export default AdminMainPage;