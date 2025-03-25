import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Seesingleblog.css";
import Header from "../component/Header.jsx";

const Seesingleblog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debugging Step 1: Log the ID from the URL
  console.log("ID from URL:", id);

  useEffect(() => {
    if (!id) {
      console.error("No ID found in URL");
      setError("Invalid blog ID.");
      setLoading(false);
      return;
    }

    console.log("Fetching blog with ID:", id); // Debugging log

    axios
      .get(`http://localhost:8080/api/models/${id}`)
      .then((response) => {
        console.log("Fetched Blog Data:", response.data);
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Debugging Step 2: Log the blog data before rendering
  console.log("Blog Data:", blog);

  return (
    <div className="seesingleblog-container"> {/* Ensure this class is applied correctly */}
      <Header />
      <h1 className="text-4xl font-bold text-black">{blog?.title || "Untitled"}</h1>
      <p className="text-gray-700 mt-4">{blog?.content || "No content available."}</p>
    </div>
  );
};

export default Seesingleblog;