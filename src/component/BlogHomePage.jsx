import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import axios from "axios";
import "../css/BlogHomepage.css";

const BlogHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

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

  // Filter blogs based on title only
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Header />

      {/* Search Bar Positioned Right */}
      <div className="mt-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-blue-500 bg-gray-200 text-gray-800 p-2 rounded-md w-1/2"  // Adjust width as needed
        />
      </div>

      {/* Mental Health Blog Title */}
      <h1 className="custom-title text-4xl font-bold text-black mt-4 text-center">
        Mental Health Blog
      </h1>

      {/* Create Blog Button */}
      <div className="mt-6 text-center">
        <Link to="/write">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition">
            Create Blog
          </button>
        </Link>
      </div>

      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 mt-16">
        {filteredBlogs.length === 0 && !loading && !error ? (
          <p className="text-black">No blogs found matching the search.</p>
        ) : (
          filteredBlogs.map((blog) => (
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