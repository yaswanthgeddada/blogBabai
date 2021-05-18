import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Topbar from "./../components/Topbar";
import Blog from "./../components/Blog";
import UserContext from "../context/userContext";
import firebase from "../config/firebase-config";
import { getBlogsByUserId } from "../services/firebase";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);

  const { currentUser } = useContext(UserContext);
  const user = firebase.auth().currentUser;
  const blogText = useRef();
  const BlogTitle = useRef();

  const postBlogHandler = async () => {
    console.log(
      "%cPOST_ADDED",
      "color:orange; font-weight:bold",
      "New Blog Added"
    );

    await firebase
      .firestore()
      .collection("Posts")
      .add({
        userId: user.uid,
        blogTitle: BlogTitle.current.value,
        blogText: blogText.current.value,
        dateCreated: Date.now(),
      })
      .then(getUserblogs());

    blogText.current.value = "";
    BlogTitle.current.value = "";
  };

  const getUserblogs = useCallback(async () => {
    const userBlogs = await getBlogsByUserId(user.uid);
    console.log(
      "%cGET_POSTS_OF_USER (getUserblogs)",
      "color:orange; font-weight:bold",
      userBlogs
    );
    setBlogs(userBlogs);
  }, [user?.uid]);

  useEffect(() => {
    getUserblogs();
  }, [getUserblogs, user]);

  // console.log(currentUser);

  return (
    <div>
      <Topbar />

      <div className="md:flex justify-center">
        <div className="mt-20  mx-20">
          <img
            src={currentUser?.photoURL || "/assets/images/nophoto.png"}
            className="ring-2 p-4 border h-40 w-40"
            alt=""
          />
        </div>
        <div className="mt-20 ring-2  md:w-2/7  text-center">
          <div className=" border border-red-400 p-4 px-8 md:mx-auto md:ml-30">
            <input
              ref={BlogTitle}
              type="text"
              placeholder="Title"
              className="border 
            border-black 
            rounded-lg 
            p-1
            placeholder-opacity-75 
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            mb-3
            "
            />

            <textarea
              ref={blogText}
              id="blog"
              type="text"
              placeholder="Type here"
              className="border 
            border-black 
            rounded-lg 
            w-6/7
            p-1
            placeholder-opacity-75 
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500"
            />
            <div>
              <button
                onClick={postBlogHandler}
                className="m-2 border focus:outline-none  border-blue-600 rounded-lg px-3 py-1 text-white  text-sm bg-blue-900 hover:bg-blue-500 "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />

      <hr className="my-4" />
      <div className="container  mx-auto px-20 mb-10">
        <span className="text-center md:mx-56">My Blogs :</span>
        {blogs.map((blog) => (
          <React.Fragment key={blog.blogId}>
            <Blog currentBlog={blog} currentUser={user} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Profile;
