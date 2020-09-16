import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <ul>
                <Link to="/"><button>Home</button></Link>
                <Link to="/login"><button>Login here</button></Link>
                <Link to="/register"><button>register new account</button></Link>
                <Link to="/mainPage"><button>Main page</button></Link>
                <Link to="/userAccount"><button>User account</button></Link>
                <Link to="/adminMainPage"><button>admin page</button></Link>
            </ul>
        </div>
    );
}
export default NavBar;