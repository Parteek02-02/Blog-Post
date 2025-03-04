import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css"; 

const Header = () => {
  return (
    <nav>
      <div className="nav-content">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;