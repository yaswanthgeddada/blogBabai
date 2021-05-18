import { createContext } from "react";

const UserContext = createContext({
  displayName: "",
  email: "",
  phoneNumber: null,
  photoURL: "",
  providerId: "",
  uid: "",
});

export default UserContext;
