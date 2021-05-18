import firebase from "../config/firebase-config";

export async function getAllBlogs() {
  const res = await await await firebase
    .firestore()
    .collection("Posts")
    .orderBy("dateCreated", "desc")
    .get();

  const allBlogs = res.docs.map((blog) => ({
    ...blog.data(),
    blogId: blog.id,
  }));

  return allBlogs;
}

export async function getBlogsByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("Posts")
    .where("userId", "==", userId)
    .get();

  const userBlogs = result.docs.map((doc) => ({
    ...doc.data(),
    blogId: doc.id,
  }));

  return userBlogs;
}

export async function getUserByUserId(uid) {
  const result = await firebase
    .firestore()
    .collection("Users")
    .where("uid", "==", uid)
    .get();

  let user;

  result.docs.forEach((doc) => {
    if (doc.exists) {
      user = doc.data();
      return doc.data();
    }
  });

  if (user === undefined) {
    return "";
  } else {
    return user;
  }
}

export async function addUser(userData) {
  const result = await firebase
    .firestore()
    .collection("Users")
    .add(userData)
    .then(() => {
      console.log("added");
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
}
