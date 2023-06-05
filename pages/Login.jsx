import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";
import { db, app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles/Login.module.css";
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
      <div style={{ backgroundColor: "#1E1E1E" }}>
        <img className={styles.devs_img} src="/assets/images/devs.jpeg" />
        <img
          src="/assets/images/events.png"
          className={styles.side_img}
          alt="W3Schools.com"
        />
        <div className={styles.Authentication}>
          <form onSubmit={(e) => {
            e.preventDefault();
            loginMsg();
          }}>
            <h2 style={{ fontSize: "2.7rem" }} className={styles.greet_text}>Welcome Back!</h2>
            <h5 style={{ color: "grey" }} className={styles.greet_text}>Login into your Account to access your Dashboard</h5>
            <input
              type="email"
              placeholder="Email"
              style={{ textIndent: "10px" }}
              className={`${styles.formInput} ${styles.emailInput}`}
              onChange={(e) => {
                if (e.target.value) {
                  setEmail(e.target.value.trim());
                }
              }}
            />
            <input
              type="password"
              style={{ textIndent: "10px" }}
              placeholder="Password"
              className={`${styles.formInput} ${styles.passwordInput}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="ui toggle checkbox ">
              <input type="checkbox" name="public" />
              <label>Remember Me</label>
            </div>
            <button className={`${styles.login_btn}`} type="submit">
              Log In
            </button>
          </form>
          <div className={styles.need_help}>
            Need help with Login ? <a href="#">Contact Us!</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
