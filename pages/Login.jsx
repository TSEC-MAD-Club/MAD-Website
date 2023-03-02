import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getStorage } from "firebase/";
const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState(undefined);
  const router = useRouter();
  
  const loginMsg = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("logged in!");
        console.log(
          "Logged in as " + email + " and user credential ",
          userCredential
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            password,
          })
        );
        // navigate("/dashboard");
        // router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "error");
        // ..
      });
  };

  return (
    <div className="signInUp-body body">
      <div className="box">
        <div className="left">
          <img src="/welcome.svg"></img>
          <p>WELCOME TO Dev's Club</p>
        </div>
        <div className="right">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMsg();
            }}
            className="right-container"
          >
            <h2>Login to your account</h2>
            <div className="field">
              <p>Email</p>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Log in" />
          </form>
        </div>
      </div>
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="shape3"></div>
    </div>
  );
};

export default Login;
