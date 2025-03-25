import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import axios from "axios"; // Import axios for making HTTP requests
import "../css/BlogHomepage.css";

const BlogHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  // Fetch blogs from backend using axios when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/models") // Your backend API URL
      .then((response) => {
        setBlogs(response.data); // Update state with fetched blogs
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later."); // Set error message
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty dependency array ensures this runs only once when component mounts

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
        {/* Optional: Add description or introductory text here */}
      </p>

      {/* Loading State */}
      {loading && <p>Loading blogs...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Blog Grid */}
      <div className="grid gap-4 mt-16"> {/* Increased margin-top for spacing */}
        {blogs.length === 0 && !loading && !error ? (
          <p className="text-black" style={{ color: 'black' }}>
            No blogs available. Be the first to write one!
          </p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold">{blog.title || 'Untitled'}</h2>
              <p className="text-gray-600">{blog.content || 'No content available.'}</p>
              <Link to={`/blogs/${blog.id}`} className="text-blue-500">
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