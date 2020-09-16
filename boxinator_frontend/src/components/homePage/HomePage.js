import React from "react";
import {Link} from "react-router-dom";
import DraggableDialog from "./DraggableDialog";

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Boxinator</h1>
            <p>Here can you send shipments to whichever place you choose</p>
            <h5>Click on "Add new shipment" to be able to add the information needed</h5>
            <DraggableDialog></DraggableDialog>
            {/*<Link to="/addShipmentGuest"><button onClick={handleClick}>Add new shipment</button></Link>*/}
        </div>
    )
}
export default HomePage;