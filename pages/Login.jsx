import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { db, app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import style from "../styles/Login.module.css";
import { toast } from "react-nextjs-toast";
import { collection, getDocs } from "firebase/firestore";

// import { getStorage } from "firebase/";

const Login = ({ setLoggedIn, setUser, loggedIn }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const loginMsg = () => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const facultyRef = collection(db, "Faculty");
        const querySnapshot = await getDocs(facultyRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (doc.id === auth.currentUser.uid) {
            setUser({
              name: data.name,
              email: data.email,
              type: data.type,
            });
            setLoggedIn(true);
            toast.notify("Successfully logged in!!", { type: "success" });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.notify(errorCode + " " + errorMessage, { type: "error" });
      })
      .finally(() => {
        if (loggedIn) {
          toast.notify("User not found!", { type: "error" });
        }
      });
  };

  return (
    <>
      <div className={style.signInUpBody}>
        <div className="box">
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
                  onChange={(e) => {
                    if (e.target.value) {
                      setEmail(e.target.value.trim());
                    }
                  }}
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
