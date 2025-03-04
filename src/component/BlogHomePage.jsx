import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx"; 
import "../css/BlogHomepage.css";  

const BlogHomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs([]);
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <Header />

     
      <h1 className="custom-title text-4xl font-bold text-black">
       Mental Health Blog
      </h1>
      <div className="mt-6">
        <Link to="/write">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition">
            Create Blog
          </button>
        </Link>
      </div>

      <p className="text-gray-700 mt-6 bg-gray-100 p-3 rounded-md">
          . 
      </p>
      
      <div className="grid gap-4 mt-6">
        {blogs.length === 0 ? (
          <p className="text-black" style={{ color: 'black' }}>No blogs available. Be the first to write one!</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.description}</p>
              <Link to={`/blogs/${blog.id}`} className="text-blue-500">Read More</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogHomePage;