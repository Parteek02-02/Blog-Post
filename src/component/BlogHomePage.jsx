import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import axios from "axios";
import "../css/BlogHomepage.css";

const BlogHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/models") // Fetch all blogs
      .then((response) => {
        console.log("Fetched Blogs:", response.data); // Debugging log
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      });
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

      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 mt-16">
        {blogs.length === 0 && !loading && !error ? (
          <p className="text-black">No blogs available. Be the first to write one!</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold">{blog.title || "Untitled"}</h2>
              <p className="text-gray-600">{blog.content?.substring(0, 100) || "No content available."}...</p>
              <Link to={`/blog/${blog.id}`} className="text-blue-500">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogHomePage;