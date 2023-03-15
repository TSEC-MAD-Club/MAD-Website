import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "./_app";
import Link from "next/link";

const StaticData = React.memo(function StaticPage({ user }) {
  return (
    <>
      <section className="main-1 container-fluid">
        <div className="row section-1">
          <div className="col-5 sloganNbtn">
            <div className="sloganImg">
              <p className="slogan-title" style={{ color: "var(--primary-3)" }}>
                {user?.type === "faculty"
                  ? "Faculty"
                  : user.type === "admin"
                  ? "Admin"
                  : "Committee"}
                <br />
                Dashboard
              </p>
            </div>

            <div className="button-box">
              {user.type === "faculty" ? (
                <>
                  <Link
                    passHref={true}
                    className="button-box-link"
                    href="/SendNotes"
                  >
                    <button
                      type="button"
                      className="btn btn-lg btn-primary ps-5 pe-5"
                    >
                      Send Notes
                    </button>
                  </Link>
                  <Link passHref={true} href="/CreateReminder">
                    <button
                      type="button"
                      className="btn btn-lg btn-primary ps-5 pe-5"
                    >
                      Create Notification
                    </button>
                  </Link>
                </>
              ) : user.type === "admin" ? (
                <Link passHref={true} href="/Admin">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary ps-5 pe-5"
                  >
                    Approve Events
                  </button>
                </Link>
              ) : (
                <Link
                  passHref={true}
                  className="button-box-link"
                  href="/CreateEvent"
                >
                  <button
                    type="button"
                    className="btn btn-lg btn-primary ps-5 pe-5"
                  >
                    Create Event
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="col-7 text-center jumbotron">
            <Image
              src="/assets/images/events.png"
              width={1100}
              height={846}
              alt=""
            />
          </div>
        </div>
      </section>
      <svg viewBox="0 0 1536 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000" d="M 0 189 L 495 144 L 495 0 L 0 0 Z"></path>{" "}
        <path fill="#000" d="M 494 144 L 1048 184 L 1048 0 L 494 0 Z"></path>{" "}
        <path fill="#000" d="M 1047 184 L 1437 136 L 1437 0 L 1047 0 Z"></path>
        <path fill="#000" d="M 1436 136 L 1536 165 L 1536 0 L 1436 0 Z"></path>
        <path
          fill="#181818"
          d="M 0 189 L 495 144 L 495 320 L 0 320 Z"
        ></path>{" "}
        <path
          fill="#181818"
          d="M 494 144 L 1048 184 L 1048 320 L 494 320 Z"
        ></path>{" "}
        <path
          fill="#181818"
          d="M 1047 184 L 1437 136 L 1437 320 L 1047 320 Z"
        ></path>
        <path
          fill="#181818"
          d="M 1436 136 L 1536 165 L 1536 320 L 1436 320 Z"
        ></path>
      </svg>
    </>
  );
});

export default function Home() {
  const { loggedIn, setLoggedIn, user, setUser } =
    React.useContext(UserContext);

  useEffect(() => {
    isAuthenticatedFn();
  }, []);

  function isAuthenticatedFn() {
    if (user.email) {
      return true;
    }
  }

  return (
    <>
      {loggedIn ? (
        <StaticData user={user} />
      ) : (
        <Login
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUser={setUser}
        />
      )}
    </>
  );
}
