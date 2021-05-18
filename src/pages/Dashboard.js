import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import Topbar from "../components/Topbar";
import firebase from "../config/firebase-config";
import { useHistory } from "react-router-dom";
import { getAllBlogs } from "../services/firebase";

const Dashboard = () => {
  const user = firebase.auth().currentUser;
  const localUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (localUser) {
      console.log(localUser);
    } else {
      // history.push("/login");
    }
  }, [history, localUser]);

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs);
    };
    getBlogs();
  }, []);

  return (
    <div>
      <Topbar />
      <div className="container  mx-auto px-20">
        {blogs.map((blog) => (
          <React.Fragment key={blog.blogId}>
            <Blog currentBlog={blog} currentUser={user} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
