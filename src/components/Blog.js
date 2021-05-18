import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaHeart } from "react-icons/fa";
import { format } from "timeago.js";
import { getUserByUserId } from "../services/firebase";

const Blog = ({ currentBlog }) => {
  const [like, setLike] = useState(false);
  const [blogUser, setBlogUser] = useState(null);

  useEffect(() => {
    const getBlogger = async () => {
      const blogger = await getUserByUserId(currentBlog.userId);

      setBlogUser(blogger);
    };

    getBlogger();
  }, [currentBlog]);

  const likeHandler = () => {
    console.log("clicked");
    setLike(!like);
  };

  return (
    <div className=" w-86 md:w-3/7 -ml-14  mb-10 bg-indigo-200 md:mx-auto border hover:bg-indigo-300 cursor-pointer border-indigo-400 rounded-lg mt-8 ">
      <div className="flex justify-between bg-gray-300 rounded-t-lg shadow-md">
        <div>
          <div className=" flex p-2 cursor-pointer">
            <img
              src={blogUser?.photoURL || "/assets/images/nophoto.png"}
              className="h-10 w-10 rounded-full border border-gray-500 "
              alt=""
            />
            <span className="mx-4 text-lg text-indigo-700 filter drop-shadow-lg -mt-2">
              {blogUser?.displayName}
              <span className="flex flex-col text-xs text-blue-700">
                {format(currentBlog.dateCreated)}
              </span>
            </span>
          </div>
        </div>

        <div className="text-right p-4 cursor-pointer">
          <FaEllipsisV size="20" />
        </div>
      </div>

      <div className="m-4 p-4 container normal-case break-words leading-normal">
        <div>
          <span className="text-red-800 text-border filter drop-shadow-md text-lg underline pb-2 font-semibold">
            Title : {currentBlog?.blogTitle}
          </span>
        </div>
        <br />
        {currentBlog?.blogText}
      </div>
      <div className="border-t-2" />
      <div className="m-2 flex justify-between">
        <div className=" mx-2  flex">
          <div
            onClick={likeHandler}
            className={
              like
                ? "text-red-700 hover:text-red-500 cursor-pointer"
                : "text-red-300 hover:text-red-500 cursor-pointer"
            }
          >
            <FaHeart size="25" />
          </div>
          <p className="ml-4 text-md text-black filter drop-shadow-md">
            {" "}
            4 people liked this blog
          </p>
        </div>
        <div className="mr-4 text-gray-600">comments</div>
      </div>
    </div>
  );
};

export default Blog;
