import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import style from "../styles/Login.module.css";
// import { getStorage } from "firebase/";

const Login = ({ setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const loginMsg = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "error");
        // ..
      });
  };

  return (
    <>
      <div className={style.signInUpBody}>
        <div className="box">
          <div className="left">
            <img className={style.welcomeImg} src="/welcome.svg"></img>
            <p className={style.welcomeText}>WELCOME TO Dev's Club</p>
          </div>
          <div className="right">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginMsg();
              }}
              className={style.rightContainer}
            >
              <h2 className={style.loginTitle}>Login to your account</h2>
              <div className={style.field}>
                <p className={style.emailText}>Email</p>
                <input
                  className={style.emailInput}
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.field}>
                <p className="password-text">Password</p>
                <input
                  className={style.passwordInput}
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                className={style.loginButton}
                type="submit"
                value="Log in"
              />
            </form>
          </div>
        </div>
        <div className="shape1 shape"></div>
        <div className="shape2 shape"></div>
        <div className="shape3 shape"></div>
      </div>
    </>
  );
};

export default Login;
