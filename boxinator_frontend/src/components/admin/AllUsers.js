import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {GET} from '../../api/CRUD'
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
import UpdateIcon from '@material-ui/icons/Update';
import { Tooltip } from '@material-ui/core';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {

        GET('/users').then(res => setUsers(res.data)).catch(err => console.log(err));

    },[])

    const url = "/updateUser";

    function createData(id, firstname, lastname, dateOfBirth, email, countryOfResidence, contactNumber) {

        return { id, firstname, lastname, dateOfBirth, email, countryOfResidence, contactNumber };
    }

    const rows = users.map(user => (

        createData(user.id, user.firstname, user.lastname, user.dateOfBirth, user.email, user.countryOfResidence, user.contactNumber)

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
        { id: 'firstname', label: 'Firstname', minWidth: 100 },
        { id: 'lastname', label: 'Lastname', minWidth: 100 },
        {
            id: 'dateOfBirth',
            label: 'Date Of Birth',
            minWidth: 100,
            align: 'right'
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'countryOfResidence',
            label: 'Country Of Residence',
            minWidth: 100,
            align: 'right',
            // format: (value) => value.toFixed(2),
        },
        {
            id: 'contactNumber',
            label: 'Contact number',
            minWidth: 100,
            align: 'right',
            // format: (value) => value.toFixed(2),
        },
    ];

    return (
        <>
 <h1>All Users</h1>
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
                                        
                                        <Link to={`/updateUser/${row.id}`}>
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
export default AllUsers;