import React from "react";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const CountryCost = () => {
    return(
        <div>
            <Table>
                <thead>
                <th>Country</th>
                <th>Multiplier</th>
                </thead>
                <tbody>
                <td>Sweden</td>
                <td><input type="text"/></td>
                </tbody>
            </Table>
            <br></br>
            <Link to="/adminMainPage"><Button variant="success">Admin main page</Button></Link>
        </div>
    )
}
export default CountryCost;