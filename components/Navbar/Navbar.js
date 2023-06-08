import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";

const Navbar = () => {
  const { loggedIn, setLoggedIn } = React.useContext(UserContext);
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
      <div className="container-fluid homebox" style={{ height: "90px" }}>
        <Link
          passHref={true}
          className="navbar-brand"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginLeft: "20px",
          }}
          href="/"
        >
          <Image
            className="navbar-logo"
            src="/assets/images/logo.png"
            width={80}
            height={80}
            alt=""
          />
        </Link>
        <div className="">
          {loggedIn ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-5">
                <button
                  className="nav-link"
                  style={{ background: "none", border: 0 }}
                  onClick={() => {
                    // localStorage.setItem("loggedIn", false);
                    setLoggedIn(false);
                    router.push("/");
                  }}
                  aria-current="page"
                >
                  <img
                    src="https://i.ibb.co/2Y5LJ0C/image-removebg-preview.webp"
                    height="50"
                    width={"50"}
                    style={{ width: "50px" }}
                    alt="logout-img"
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
