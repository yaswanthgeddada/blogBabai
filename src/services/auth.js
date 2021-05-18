import firebase from "../config/firebase-config";

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default socialMediaAuth;
