// src/Components/navbar/Navbar.jsx
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [linkPath, setLinkPath] = useState(null);
  // console.log(location);

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/home":
        setLinkPath({ path: "/new-trip", text: "New Trip" });
        break;
      default:
        setLinkPath(null);
    }
  }, [location]);

  return (
    <nav className="navbar">
      <h1 className="navbar__title">
        <Link to="/home">Trip Planner</Link>
      </h1>
      {linkPath && (
        <div className="navbar__new">
          <Link to={linkPath.path}>{linkPath.text}</Link>
        </div>
      )}
    </nav>
  );
}
