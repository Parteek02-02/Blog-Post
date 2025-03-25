import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogHomePage from "./component/BlogHomePage"; 
import BlogPost from "./component/BlogPostPage"; 
import Seesingleblog from "./component/Seesingleblog";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<BlogHomePage />} /> 
          <Route path="/write" element={<BlogPost />} /> 
          <Route path="/blog/:id" element={<Seesingleblog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;