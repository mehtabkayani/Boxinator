import React from "react";
import {Link} from "react-router-dom";

const NewShipment = () => {
    return (
        <div>
            <h1>New shipment: </h1>
            <form>
                <div>
                    <label>Receiver name : </label>
                    <input type="text" placeholder="Enter name"/>
                </div>
                <div>
                    <label>Weight (kg): </label>
                    <input type="number" placeholder="Enter weight"/>kg
                </div>
                <div>
                    <label>Box colour: </label>
                    <input type="color"/>
                </div>
                <div>
                    {/* Maybe have registered countries to chose from */}
                    <label>Destination country: </label>
                    <input type="text" placeholder="Enter country"/>
                </div>
                <br></br>
                <div>
                    <button>Add shipment</button>
                </div>
            </form>
            <br></br>
            <Link to="/mainPage"> <button>Go back</button></Link>
        </div>
    );
}
export default NewShipment;