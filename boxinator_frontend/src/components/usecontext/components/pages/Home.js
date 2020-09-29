import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import GuestHome from "./guest/GuestHome";
import AdminHome from './admin/AdminHome';
import UserHome from './user/UserHome';

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.userRole === "ADMINISTRATOR" ? (
        <h1>Welcome {userData.username}</h1>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}


{/* {userData.userRole === "ADMINISTRATOR" 
? <AdminHome/>
:(userData.userRole === "REGISTERED_USER"
 ? <UserHome/> 
 : <GuestHome/> )} */}










    </div>
  );
}