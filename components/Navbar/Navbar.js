import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserContext } from "../../pages/_app";

const Navbar = () => {
  const { loggedIn, setLoggedIn } = React.useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
      <div className="container-fluid homebox" style={{ height: "90px" }}>
        <a
          className="navbar-brand"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginTop: "0px",
          }}
          href="/"
        >
          <Image
            className="navbar-logo"
            src="/assets/images/Background-14.png"
            width={80}
            height={80}
            objectFit={"cover"}
            alt=""
          />{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="desktop-menu collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          {loggedIn ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-5 ">
                <Link href={"/SendNotes"}>
                  <a className="nav-link">Send Notes</a>
                </Link>
              </li>
              <li className="nav-item me-5">
                <button
                  className="nav-link"
                  style={{ background: "none", border: 0 }}
                  onClick={() => {
                    localStorage.setItem("loggedIn", false);
                    setLoggedIn(false);
                  }}
                  aria-current="page"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
