import React from "react";
import {Link} from "react-router-dom";
import DraggableDialog from "./DraggableDialog";
import '../../style/style.css'

const HomePage = () => {
    return (
        <div className="homeContainer">
            <h1>Welcome to Boxinator</h1>
            <p>Here can you send shipments to whichever place you choose</p>
            <br></br>
            <h5>Click on "Add new shipment" to be able to add the information needed</h5>
            <br></br>
            <DraggableDialog></DraggableDialog>
            {/*<Link to="/addShipmentGuest"><button onClick={handleClick}>Add new shipment</button></Link>*/}
        </div>
    )
}
export default HomePage;