import React, { useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { photos } from "../photoassets/PhotoAssets";
import Switch from "react-switch";
import { SunIcon } from "../SunIcon";
import { MoonIcon } from "../MoonIcon";
import style from "../Sidebar/Sidebar.module.css";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
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
          <div className={`${styles.open}`}>
            <div className={styles.hamburgerInfo}>
              <img className={style.sidebarLogo} src={photos.DP} alt="" />
              <div className={styles.sidebarUser}>
                <h5 className={style.sidebarUsername}>Emily Jonson</h5>
                <h5 className={style.sidebarUsermail}>emilyjon@gmail.com</h5>
                <hr className={style.sidebarHorizontalRule} />
              </div>
              <ul>
                <li>
                  <a href="#">
                    <img src={photos.Dashboard} alt="" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={photos.Bell} alt="" />
                    Create Notifications
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={photos.Bell} alt="" />
                    Past Notifications
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={photos.Notes} alt="" />
                    Create Notes
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={photos.Notes} alt="" />
                    Past Notes
                  </a>
                </li>
              </ul>
              <div className={style.sidebarInformation}>
                <Switch
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
                  {formattedDate}
                  {getOrdinalIndicator(day)}
                </p>
                <button>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HamburgerMenu;
