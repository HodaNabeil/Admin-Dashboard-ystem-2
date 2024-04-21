import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { useCallback, useEffect, useState } from "react";
import React from "react";
function Header() {
  const [activeLink, setActiveLink] = useState("Home");
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const clickOutSide = (e) => {
      if (openNav) {
        if (
          !e.target.closest(".nav-links") &&
          !e.target.closest(".menu-icons")
        ) {
          setOpenNav(false);
        }
      }
    };
    window.addEventListener("click", clickOutSide);
    return () => {
      window.removeEventListener("click", clickOutSide);
    };
  }, [openNav]);

  const handleActiveLink = useCallback((link) => {
    setActiveLink(link);
  }, []);

  const toggle = useCallback(() => {
    setOpenNav((prevOpenNav) => !prevOpenNav);
  }, []);

  const links = [
    { linkName: "Home", to: "" },
    { linkName: "Metrics", to: "metrics" },
    { linkName: "EndPoints", to: "endPoints" },
    { linkName: "Events", to: "events" },
    { linkName: "Vulnerabilities", to: "vulnerabilities" },
  ];

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={require("../../Img/logo.jpeg")} alt="" />
        </Link>
        <nav>
          <ul className={`nav-links ${openNav === true ? "openNav" : ""}`}>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <NavLink
                    onClick={() => handleActiveLink(link.linkName)}
                    to={`/${link.to}`}
                    className={`${
                      activeLink === link.linkName ? "active" : ""
                    } ${openNav && "openNav"}`}
                  >
                    {link.linkName}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="menu-icons" onClick={toggle}>
            {[1, 2, 3].map((_, index) => {
              return (
                <span
                  key={index}
                  className={`${openNav ? "active-menu" : " "}`}
                ></span>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
