import React, { useState } from "react";
import axios from "axios";
import Header from "../component/Header.jsx";  
import "../css/BlogPostPage.css"; 

const BlogPost = () => {
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !blogContent.trim()) {
      alert("Please fill in both fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/models", {
        title,
        content: blogContent,
      });

      if (response.status === 200) {
        alert("Blog saved successfully!");
        
        setTitle("");
        setBlogContent("");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog.");
    }
  };

  return (
    <div>
      <Header />
      <div className="blog-post-container">
        <h2>Write Your Blog</h2>
        <form onSubmit={handleSubmit} className="blog-post-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Blog Title"
            className="blog-input"
          />
          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="blog-textarea"
          />
          <button type="submit" className="post-button">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPost;