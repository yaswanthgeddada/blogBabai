import React, { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { facebookProvider, googleProvider } from "../config/authMethods";
import socialMediaAuth from "../services/auth";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import { addUser, getUserByUserId } from "../services/firebase";

const Login = () => {
  let history = useHistory();
  const { setCurrentUser } = useContext(UserContext);

  const handdleLogin = (provider) => {
    socialMediaAuth(provider).then((user) => {
      if (user?.user) {
        console.log(user.user);
        setCurrentUser(user.user.providerData[0]);
        addUserToFirebase(user);
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            displayName: user.user.providerData[0].displayName,
            email: user.user.providerData[0].email,
            phoneNumber: user.user.providerData[0].phoneNumber,
            photoURL: user.user.providerData[0].photoURL,
            providerId: user.user.providerData[0].providerId,
            uid: user.user.uid,
          })
        );

        history.push("/");
      } else {
      }
    });
  };

  const addUserToFirebase = async (user) => {
    let curruser = await getUserByUserId(user.user.uid);

    if (curruser !== "") {
      console.log("user already exists");
      return;
    }

    const usr = {
      displayName: user.user.providerData[0].displayName,
      email: user.user.providerData[0].email,
      phoneNumber: user.user.providerData[0].phoneNumber,
      photoURL: user.user.providerData[0].photoURL,
      providerId: user.user.providerData[0].providerId,
      uid: user.user.uid,
    };

    await addUser(usr);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-gray-200 md:min-w-2/4 md:w-2/7 text-center  relative sm:w-auto   mx-auto top-36">
        <div>
          <div className="text-4xl absolute top-15 left-20 font-semibold text-black drop-shadow-lg">
            Blog babai
          </div>
          <img src="/assets/images/login.png" className="rounded-t-xl" alt="" />
        </div>

        <button
          className="
        bg-red-400
       hover:bg-red-500 px-3
        text-white font-semibold 
        rounded-lg m-2 
        focus:outline-none "
          onClick={() => handdleLogin(facebookProvider)}
        >
          <span className="flex my-1">
            <FaFacebook className="mt-1 mx-1" />
            facebook
          </span>
        </button>

        <button
          className="
        bg-red-400
       hover:bg-red-500 px-3
        text-white font-semibold 
        rounded-lg m-2 
        focus:outline-none "
          onClick={() => handdleLogin(googleProvider)}
        >
          <span className="flex my-1">
            <FaGoogle className="mt-1 mx-1" />
            Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
