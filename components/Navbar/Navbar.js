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
        <div className=" navbar-collapse">
          {loggedIn ? (
            <ul className="navbar-nav ms-auto">
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
                  <img
                    src="https://i.ibb.co/2Y5LJ0C/image-removebg-preview.webp"
                    height="50"
                  />
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
