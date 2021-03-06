import React, {useState,useEffect} from 'react';
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
// import CancelIcon from '@material-ui/icons/Cancel';
// import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import {Link} from "react-router-dom";
// import SpecificShipment from '../admin/SpecificShipment';
// import { useHistory } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {GET, PUT} from '../../api/CRUD'
import ConfirmDialog from '../Dialog/CofirmDialog';


const columns = [
  { id: 'id', label: '#ID', minWidth: 70 },
  { id: 'color', label: 'Color', minWidth: 70 },
  { id: 'to', label: 'To', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'creationDate',
    label: 'Creation Date',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'shipmentStatus',
    label: 'Shipment Status',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(id,color,to, country, price, weight,creationDate,shipmentStatus) {

  return { id,color,to, country, price, weight,creationDate,shipmentStatus};
}

const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '50%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MainPage2() {
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shipments, setShipments]= useState([]);
  const [statusOption, setStatusOption] = useState('');
  const [shipment, setShipment]= useState({});


  useEffect(()=>{
          getShipments(statusOption);
  },[statusOption])

  const rows = shipments.map(shipment => (
    createData(shipment.id,shipment.boxcolor, shipment.receiverName, shipment.country.countryName, shipment.shipmentCost, shipment.weight,shipment.creation_date,shipment.shipmentStatus)
   
));

//const listAllShipments = async () => await GET(`/shipments/customer/${accountId}`).then(res => setShipments(res.data)).catch(err => console.log(err))
const getShipments = async (status) => await GET(`/shipments/${status}`).then(res => setShipments(res.data)).catch(err => console.log(err));


const onStatusOptionChanged = async (e) =>{
  setStatusOption(e.target.value)
} 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCancelShipment = async (shipmentId) => {
    const body = {shipmentStatus: "CANCELLED" };

   await PUT(`/shipments/${shipmentId}`, body).then(res => console.log(res)).catch(err => console.log(err));
   await getShipments(statusOption);
  }
  
  return (
      <div className="divPadding">
            <Link style={{float: 'right', marginTop:'10px'}} to="/newShipment"><Button variant="contained" color="primary">Add new shipment</Button></Link>

               <FormControl className={classes.formControl}>
        <InputLabel shrink labelId="demo-simple-select-placeholder-label-label">Filter list</InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="simple-select"
          value={statusOption}
          displayEmpty
          onChange={onStatusOptionChanged}
          className={classes.selectEmpty}
        >
          <MenuItem value="">Shipments</MenuItem>
          <MenuItem value={"created"}>Created</MenuItem>
          <MenuItem value={"received"}>Received</MenuItem>
          <MenuItem value={"intransit"}>Intransit</MenuItem>
          <MenuItem value={"complete"}>Completed</MenuItem>
          <MenuItem value={"cancelled"}>Cancelled</MenuItem>
        </Select>
      </FormControl>
            <br/>
            <br/>
    <Paper className={classes.root}>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                         {(row.shipmentStatus === "CREATED" || row.shipmentStatus === "INTRANSIT") &&
                        <ConfirmDialog packetId={row.id} handleCancelShipment={handleCancelShipment}/> 
                         }  
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
