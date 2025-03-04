import React, { useState } from 'react';
import Header from "../component/Header.jsx";  
import '../css/BlogPostPage.css'; 

const BlogPost = () => {
  const [blogContent, setBlogContent] = useState('');

  const handleContentChange = (e) => {
    setBlogContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blogContent.trim()) {
      console.log('Blog submitted:', blogContent);
      setBlogContent(''); 
    } else {alert('Please write some content before submitting.');
    }
  };

  return (
    <div>
      <Header />  {/* Add the Header component here to render it */}
      <div className="blog-post-container">
        <h2>Write Your Blog</h2>
        <form onSubmit={handleSubmit} className="blog-post-form">
          <textarea
            value={blogContent}
            onChange={handleContentChange}
            placeholder="Write your blog here..."
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