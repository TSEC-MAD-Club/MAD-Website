import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { photos } from "../photoassets/PhotoAssets";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 700);

    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`${styles.sidebarWrapper} ${isMobile && !showMenu ? styles.hideSidebar : ""}`}>
      {!isMobile || (isMobile && showMenu) ? (
        <div className={styles.sidebarHeader}>
          <img className={styles.sidebarLogo} src={photos.DP} alt="" />
        </div>
      ) : null}
      {isMobile && !showMenu ? null : (
        <div className={styles.sidebarUser}>
          <h5 className={styles.sidebarUsername}>Emily Jonson</h5>
          <h5 className={styles.sidebarUsermail}>emilyjon@gmail.com</h5>
          <hr className={styles.sidebarHorizontalRule} />
        </div>
      )}
      {isMobile ? (
        <>
          <input
            className={styles.toggleCheckbox}
            type="checkbox"
            id="toggle-menu"
            checked={showMenu}
            onChange={toggleMenu}
          />
          <label className={styles.toggleLabel} htmlFor="toggle-menu">
            <span className={`${styles.toggleIcon} ${showMenu ? styles.crossIcon : ""}`}></span>
          </label>
          {showMenu && (
            <ul className={styles.sidebarMenu}>
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
          )}
        </>
      ) : (
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
      )}
    </div>
  );
};

export default Sidebar;
