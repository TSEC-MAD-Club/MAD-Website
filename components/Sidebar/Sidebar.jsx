import React, { useContext, useState } from "react";
import styles from "./Sidebar.module.css";
import { SunIcon } from "../SunIcon";
import { MoonIcon } from "../MoonIcon";
import { ThemeContext } from "../../src/context/ThemeContext";
import Switch from "react-switch";
import Features from "./link";
import { UserContext } from "../../pages/_app.js";
import { useRouter } from "next/router";
import Link from "next/link";

function HamburgerMenu({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loggedIn, setLoggedIn } = React.useContext(UserContext);
  const router = useRouter();
  const today = new Date();
  const day = today.getDate();
  const getOrdinalIndicator = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    const lastDigit = day % 10;

    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const formattedDate = today
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .replace(/\b(\d{1,2})(th|nd|rd|st)\b/, "$1" + getOrdinalIndicator(day));
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const userHasAccess = (featureTypes) => {
    return (
      featureTypes.length === 0
      || featureTypes.includes(user.type)
    );
  };
  return (
    <div className={styles.hamburgerDisplay}>
      <div
        className={`${styles["hamburger-menu"]} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles["hamburger-icon"]} onClick={toggleMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        {isOpen && (
          <div className={styles.sidebarWrapper}>
            <div className={styles.sidebarDevslogo}>
              <img
                className="loginLogo"
                src={
                  theme === "dark"
                    ? "/assets/images/devs-dark.png"
                    : "/assets/images/devs-light.png"
                }
              />
            </div>
            <div className={styles.sidebarHeader}>
              <img className={styles.sidebarLogo} src="assets/images/DP.png" alt="" />
            </div>
            <div className={styles.sidebarUser}>

              <h5 className={styles.sidebarUsername}>{user.name}</h5>
              <h5 className={styles.sidebarUsermail}>{user.email}</h5>
              <hr className={styles.sidebarHorizontalRule} />
            </div>
            <div className={styles.sidebarFunctions}>
              {Features.map((data, id) => (
                userHasAccess(data.type) ? (
                  <Link key={id} href={data.mainLink}>
                    <div className={styles.sidebarline}>
                      <img src={data.iconLink} alt="" />
                      {data.mainTitle}
                    </div>
                  </Link>
                ) : null
              ))}
            </div>

            <div className={styles.sidebarInformation}>
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

              <p>
                {formattedDate}{getOrdinalIndicator(day)}
              </p>
              <button
                onClick={() => {
                  setLoggedIn(false);
                  router.push("/");
                }} >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HamburgerMenu;
