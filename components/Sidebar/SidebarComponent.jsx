import React, { useState, useEffect, useContext } from "react";
import styles from "./Sidebar.module.css";
import { photos } from "../photoassets/PhotoAssets";
import { SunIcon } from "../SunIcon";
import { MoonIcon } from "../MoonIcon";
import { ThemeContext } from "../../src/context/ThemeContext";
import Switch from "react-switch";
import Devs from '../../public/assets/images/devs.png'

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
   const { theme, toggleTheme } = useContext(ThemeContext);
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
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric", 
    month: "long",
    
  }).replace(/\b(\d{1,2})(th|nd|rd|st)\b/, "$1" + getOrdinalIndicator(day));

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  

  return (
    <div className={`${styles.sidebarWrapper} `}>
      <div className={styles.sidebarDevslogo}>
        <img src={Devs} alt="" srcset="" />
      </div>
      <img
          className="loginLogo"
          src={
            theme === "dark"
              ? "/assets/images/devs-dark.png"
              : "/assets/images/devs-light.png"
          }
        />
     
        <div className={styles.sidebarHeader}>
          <img className={styles.sidebarLogo} src={photos.DP} alt="" />
        </div> 
        <div className={styles.sidebarUser}>
          
          <h5 className={styles.sidebarUsername}>Emily Jonson</h5>
          <h5 className={styles.sidebarUsermail}>emilyjon@gmail.com</h5>
          <hr className={styles.sidebarHorizontalRule} />
        </div>
        <div className={styles.sidebarFunctions}>
          <a href="#">
            <img src={photos.Dashboard} alt="" />
            Dashboard
          </a>
          <a href="#">
            <img src={photos.Bell} alt="" />
            Create Notifications
          </a>
          <a href="#">
            <img src={photos.Bell} alt="" />
            Past Notifications
          </a>
          <a href="#">
            <img src={photos.Notes} alt="" />
            Create Notes
          </a>
          <a href="#">
            <img src={photos.Notes} alt="" />
            Past Notes
          </a>
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
    <button >
      Logout
        </button>
        </div>
    </div>
  );
};

export default Sidebar;
