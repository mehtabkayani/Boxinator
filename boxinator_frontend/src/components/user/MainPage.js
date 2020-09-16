import React from "react";
import {Link} from "react-router-dom";
import "../../style/style.css"

const MainPage = () => {
    return (
        <div>
            <h1>Main page</h1>
            <table className="shipmentsTable">
                <tr>
                    <th>Receiver name</th>
                    <th>Weight (kg)</th>
                    <th>Box colour</th>
                    <th>Destination Country</th>
                </tr>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                </tr>
                <tr>
                    <td>Peter</td>
                    <td>34kg</td>
                    <td>red</td>
                    <td>Sweden</td>
                </tr>
            </table>
            <br></br>
           <Link to="/newShipment"><button>Add new shipment</button></Link>
        </div>
    );
}
export default MainPage;