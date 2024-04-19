import { Link } from "react-router-dom";

import "./header.css";
import { useState } from "react";

function Header() {
  const [activeLink, setActiveLink] = useState("");

  function handleActiveLink(link) {
    setActiveLink(link);
  }


  return (
    <header className=" header">
      <div className="logo">logo</div>
      <nav>
        <ul className="nav-links">
          <li onClick={() => handleActiveLink("Metrics")}>
            <Link
              to="metrics"
              className={`${activeLink === "Metrics" && "active"}`}
            >
              Metrics
            </Link>
          </li>
          <li onClick={() => handleActiveLink("EndPoints")}>
            <Link
              to="endpoints"
              className={`${activeLink === "EndPoints" && "active"}`}
            >
              EndPoints
            </Link>
          </li>
          <li onClick={() => handleActiveLink("Events")}>
            <Link
              to="events"
              className={`${activeLink === "Events" && "active"}`}
            >
              Events
            </Link>
          </li>
          <li onClick={() => handleActiveLink("Vulnerabilities")}>
            <Link
              to="vulnerabilities"
              className={`${activeLink === "Vulnerabilities" && "active"}`}
            >
              Vulnerabilities
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
