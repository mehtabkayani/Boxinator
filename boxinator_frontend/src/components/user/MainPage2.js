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
import axios from 'axios';
import {Link,Redirect} from "react-router-dom";
import SpecificShipment from '../admin/SpecificShipment';
import history from '../../history';
import {READ} from '../../api/CRUD'


const columns = [
  { id: 'id', label: '#ID', minWidth: 170 },
  { id: 'to', label: 'To', minWidth: 170 },
  { id: 'country', label: 'Country', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'creationDate',
    label: 'Creation Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id,to, country, price, weight,creationDate) {
  
  return { id,to, country, price, weight,creationDate };
}




const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function MainPage2() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shipments, setShipments]= useState([]);
  const [shipment, setShipment]= useState({});
  const accountId = localStorage.getItem('id');
  const [statusOption, setStatusOption] = useState('');

  useEffect(()=>{
          allShipments();
  },[])

  const rows = shipments.map(shipment => (
    createData(shipment.id,shipment.receiverName, shipment.country.countryName, shipment.shipmentCost, shipment.weight,shipment.creation_date)
   
));

const allShipments = async () => await READ(`/shipments/customer/${accountId}`).then(res => setShipments(res.data)).catch(err => console.log(err))

const apiCall =  async(status) => {
  console.log(status)

  await READ(`/shipments/${status}`).then(res => setShipments(res.data)).catch(err => console.log(err));
  //await axios.get(`http://localhost:8080/api/shipments/${status}`, { headers: {'Authorization': localStorage.getItem('token')} }).then(setShipments(res => res.data))

}


const onStatusOptionChanged = (e) =>{
  if(e.target.value === "all"){
    allShipments();
  }else{
    apiCall(e.target.value);
  }
} 


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCancelShipment = async (row)=> {
   let s = shipments.filter(shipment => shipment.id === row)
   let currentShipment = s[0];
   alert("You have cancelled the shipment!")
    
    const body = {shipmentStatus: "CANCELLED" };
   await axios.put(`http://localhost:8080/api/shipments/${row}`, body, { headers: {'Authorization': localStorage.getItem('token')} })

  }
  
  return (
      <>
            <Link to="/newShipment"><Button variant="contained" color="primary">Add new shipment</Button></Link>
            <select onChange={onStatusOptionChanged}>
              <option value="all" defaultChecked>All</option>
              <option value="complete">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                      
                    );
                  })}        
                           
                <Button onClick={() => handleCancelShipment(row.id)}>Cancel</Button>
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
