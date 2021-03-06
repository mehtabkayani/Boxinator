import React, {useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
import axios from "axios";
import {GET,DELETE} from '../../api/CRUD'
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
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';


const AllUsers = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        getAllUsers();

    },[])

    const getAllUsers = async() =>{
        await GET('/users').then(res => setUsers(res.data)).catch(err => console.log(err));

    }

    const url = "/updateUser";

    function createData(id, firstname, lastname, dateOfBirth, email, countryOfResidence, contactNumber, accountType) {

        return { id, firstname, lastname, dateOfBirth, email, countryOfResidence, contactNumber, accountType };
    }

    const rows = users.map(user => (

        createData(user.id, user.firstname, user.lastname, user.dateOfBirth, user.email, user.countryOfResidence, user.contactNumber, user.accountType)

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
            maxHeight: '50%',
        },
    });

    const handleGuestDelete = async (userEmail) => {
        const body = {    
            email: userEmail   
        };
 
        axios.delete("http://localhost:8080/api/guest", {
            headers: { Authorization: localStorage.getItem('token'), data: userEmail}})
         .then(res => {
             console.log(res);
            getAllUsers();
            })
            .catch(err => {
                console.log("Error: ", err);
            }) 
        

    }
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
        },
        {
            id: 'contactNumber',
            label: 'Contact number',
            minWidth: 100,
            align: 'right',
        },
        {
            id: 'accountType',
            label: 'Role',
            minWidth: 100,
            align: 'right',
        }
    ];

    return (
        <div className="divPadding">
         <h1>All Users</h1>
            <br></br>
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
                                   {(row.accountType === 'ADMINISTRATOR' || row.accountType === 'REGISTERED_USER') && <Tooltip title="Update"><EditIcon color="primary"></EditIcon></Tooltip>}
                                   
                                   {row.accountType === 'GUEST' && <Tooltip title="Cancel"><CancelIcon color="secondary"></CancelIcon></Tooltip>} 
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
        </div>
    );
}
export default AllUsers;