import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import { AiOutlineLogout } from "react-icons/ai";
import firebase from "../config/firebase-config";

const Topbar = () => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("%csignOut successfull", "font-weight: bold, color:Red");
        sessionStorage.removeItem("currentUser");
        history.push("/login");
      });
  };

  return (
    <div>
      <div className="flex justify-between  bg-indigo-600 container px-10 py-2 shadow-md w-auto mx-auto ">
        <div>
          <div className="text-white font-semibold ">
            <Link to="/">Blog Babia</Link>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/profile">
            <img
              src={currentUser?.photoURL || "/assets/images/nophoto.png"}
              className="w-9 h-9 rounded-full cursor-pointer"
              alt=""
            />
          </Link>
          <button
            onClick={logoutHandler}
            className="outline-none text-white hover:text-red-400 focus:outline-none"
          >
            <AiOutlineLogout size="25" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
