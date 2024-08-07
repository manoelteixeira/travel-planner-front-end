// src/Components/navbar/Navbar.jsx
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();

  const [linkPath, setLinkPath] = useState(null);

  useEffect(() => {
    const { pathname } = location;
    const path = pathname.split("/");
    if (path.includes("home")) {
      setLinkPath({ path: "/new-trip", text: "New Trip" });
    } else if (path.includes("add-place")) {
      setLinkPath({
        path: `..`,
        text: "Add New Place",
      });
    } else if (path.includes("trip")) {
      const trip_id = path[path.length - 1];
      setLinkPath({
        path: `/trip/${trip_id}/add-place`,
        text: "Add Place To Visit",
      });
    } else {
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
