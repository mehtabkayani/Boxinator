import React from "react";
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <form>
                <h1>Register new account : </h1>
                <div>
                    <label>First Name : </label>required
                    <input type="text" placeholder="Enter first name"/>
                </div>
                <div>
                    <label>Last Name : </label>required
                    <input type="text" placeholder="Enter last name"/>
                </div>
                <div>
                    <label>E-mail : </label>required, validate with regex
                    <input type="text" placeholder="Enter e-mail"/>
                </div>
                <div>- required, strong, and must be confirmed by repetition
                    <label>Password: </label>
                    <input type="password" placeholder="Enter password"/>
                    <div>
                    <label>Repeat Password: </label>
                    <input type="password" placeholder="Enter password"/>
                    </div>
                </div>
                <div>
                    <label>Date of birth: </label>
                    <input type="text" placeholder="Enter e-mail"/>
                </div>
                <div>
                    <label>Country of residence : </label>
                    <input type="text" placeholder="Enter e-mail"/>
                </div>
                <div>
                    <label>Zip code/Postal code : </label>
                    <input type="text" placeholder="Enter e-mail"/>
                </div>
                <div>
                    <label>Contact number : </label>
                    <input type="text" placeholder="Enter e-mail"/>
                </div>
                <div>Switch</div>
                <br></br>
                <div>
                    <button>Register</button>
                </div>
            </form>
            <br></br>
            <Link to="/login">Already registered? Login here</Link>
        </div>
    );
}
export default Register;