import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" >Go to Home</Link>
    </>
  );
}

export default NotFound;
