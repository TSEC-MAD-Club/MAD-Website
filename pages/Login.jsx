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
import { toast } from "react-nextjs-toast";
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
        toast.notify("Successfully logged in!!", { type: "success" });
        localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "error");
        toast.notify(errorCode + " " + errorMessage, { type: "error" });
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
                console.log(
                  {
                    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                    storageBucket:
                      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                    messagingSenderId:
                      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                  },
                  "FIREBASE_API_KEY"
                );
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
