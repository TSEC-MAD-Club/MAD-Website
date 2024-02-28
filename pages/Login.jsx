// components/Login.js
import React, { useContext, useState } from "react";
import { db, app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner"; // Import the Spinner component
import { toast } from "react-nextjs-toast";
import { collection, getDocs } from "firebase/firestore";
import Switch from "react-switch";
import { SunIcon } from "../components/SunIcon";
import { MoonIcon } from "../components/MoonIcon";
import { ThemeContext } from "../src/context/ThemeContext";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Icon from "react-icons-kit";
import styles from "../styles/Login.module.css";

const Login = ({ setLoggedIn, setUser, loggedIn, theme, toggleTheme }) => {
  // Accept theme as a prop
  const [loading, setLoading] = useState(false); // Add loading state
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const router = useRouter();

  const loginMsg = () => {
    setLoading(true); // Set loading to true when login process starts
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

            //remember me logic
            if (rememberMe) {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  name: data.name,
                  email: data.email,
                  type: data.type,
                })
              );
            }
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.notify(errorCode + " " + errorMessage, { type: "error" });
      })
      .finally(() => {
        setLoading(false); // Set loading to false after login process finishes
        if (loggedIn) {
          toast.notify("User not found!", { type: "error" });
        }
      });
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handlePasswordToggle = () => {
    if (type == "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="page-width">
      <div className="loginHeader">
        <img
          className="loginLogo"
          src={
            theme === "dark"
              ? "/assets/images/devs-dark.png"
              : "/assets/images/devs-light.png"
          }
        />
        <Switch
          checked={theme === "dark" ? true : false}
          onChange={toggleTheme}
          uncheckedHandleIcon={
            <SunIcon
              width={16}
              height={16}
              style={{ marginTop: "-6px", marginLeft: "2px" }}
            />
          }
          checkedHandleIcon={
            <MoonIcon
              width={16}
              height={16}
              style={{ marginTop: "-6px", marginLeft: "2px" }}
            />
          }
          onColor={"#2a66ff"}
          offColor={"#C9C9C9"}
          uncheckedIcon={false}
          checkedIcon={false}
          height={24}
          width={48}
          handleDiameter={20}
        />
      </div>
      <div className="loginWrapper">
        <div>
          <form
            className="loginForm"
            onSubmit={(e) => {
              e.preventDefault();
              loginMsg();
            }}
          >
            <h2 className="loginTitle">Welcome Back!</h2>
            <h5 className="loginSubtitle">
              Login into your account to access your dashboard
            </h5>
            <input
              type="email"
              placeholder="Email"
              className="loginInputs"
              onChange={(e) => {
                if (e.target.value) {
                  setEmail(e.target.value.trim());
                }
              }}
            />
            <div className={styles.password}>
              <input
                type={type}
                placeholder="Password"
                className="loginInputs"
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              <span onClick={handlePasswordToggle} className={styles.eye_icon}>
                <Icon icon={icon}></Icon>
              </span>
            </div>
            <div className={styles.switch}>
              <Switch
                checked={rememberMe}
                onChange={handleRememberMe}
                onColor={"#2a66ff"}
                offColor={"#C9C9C9"}
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={48}
                handleDiameter={19}
              />
              <label>Remember Me</label>
            </div>
            <button type="submit" className="loginButton">
              {loading ? <Spinner /> : "Log In"}{" "}
              {/* Display spinner or button text based on loading state */}
            </button>
            <div>
              Need help with login?{" "}
              <a
                style={{ color: "var(--devs-blue)" }}
                href="https://wa.me/+918104543329?text=Hey,%20Need%20help%20with%20devs%20dashboard%20login"
                target="_blank"
              >
                {" "}
                Contact Us!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
