import React from "react";
import {Link} from "react-router-dom";
import Select from 'react-select'

const NewShipment = () => {
    const options = [
        { value: 'sweden', label: 'Sweden' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'norway', label: 'norway' }
    ]
    return (
        <div>
            <h1>New shipment: </h1>
            <br></br>
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
                    <Select options={options} />
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