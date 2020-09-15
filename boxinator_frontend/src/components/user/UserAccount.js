import React from "react";
import {Link} from "react-router-dom";

const UserAccount = () => {
    return (
        <div>
            <h1>User Account : </h1>
            <form>
                <div>
                    <label>First Name : </label>
                    <input type="text" placeholder="Enter first name"/>
                </div>
                <div>
                    <label>Last Name : </label>
                    <input type="text" placeholder="Enter last name"/>
                </div>
                <div>
                    <label>E-mail : </label>
                    <input type="text" placeholder="Enter e-mail"/>
                </div>
                <div>
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
                    <button>Save changes</button>
                </div>
            </form>

                <br></br>
                <Link to="/mainPage"><button>Go back</button></Link>

        </div>
    );
}
export default UserAccount;