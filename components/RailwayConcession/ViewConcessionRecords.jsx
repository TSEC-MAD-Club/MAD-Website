import React, { useState } from "react";
import Switch from "react-switch";
import { SunIcon } from "../SunIcon";
import { MoonIcon } from "../MoonIcon";
import style from "./RailwayConcession.module.css";
const ViewConcessionRecords = () => {
  const [isWestern, setIsWestern] = useState(true);

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div>
          <img src="/assets/images/devs-light.png" />
        </div>
        <div className={style.profile}>
          <img src="/assets/images/DP.png" />
          <h4 className={style.title}>Helloe</h4>
          <h5>email@gmail.com</h5>
          <img src="/assets/images/Line 3.png" />
          <div className={style.dash_nav_container}>
            <div className={style.dash_nav}>
              <img src="/assets/images/Dashboard.png" />
              <span>Dashboard</span>
            </div>

            <div className={style.dash_nav}>
              <img src="/assets/images/Bell.png" />
              <span>Create Notifications</span>
            </div>
            <div className={style.dash_nav}>
              <img src="/assets/images/Bell.png" />
              <span>Past Notifications</span>
            </div>
            <div className={style.dash_nav}>
              <img src="/assets/images/Notes.png" />
              <span>Create Notes</span>
            </div>
            <div className={style.dash_nav}>
              <img src="/assets/images/Notes.png" />
              <span>Paste Notes</span>
            </div>
          </div>
        </div>
        <div className={style.darkmode}>
          <Switch
            uncheckedHandleIcon={
              <SunIcon
                width={16}
                height={16}
                className={style.toggle_icon_style}
              />
            }
            checkedHandleIcon={
              <MoonIcon
                width={16}
                height={16}
                className={style.toggle_icon_style}
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
        <h4 className={style.date}>Monday, 5th June</h4>
        <h4
          className={style.date}
          style={{ fontSize: "20px", marginTop: "8%" }}
        >
          Logout
        </h4>
      </div>
      <div className={style.maincontent}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ paddingleft: "7%" }}>
            <h1
              className={style.view_csv}
            >
              View CSV Files
            </h1>
            <h6
              className={style.view_csv_description}
            >
              View or Download csv files of concession records
            </h6>
          </div>

          <div style={{ position: "relative" }}>
            <input
              placeholder="Enter Certificate Number"
              type="text"
              className={style.certificate_no_input}
            ></input>
            <span
              className={style.search_icon}
            >
              <img src="\assets/images/search.png" />
            </span>
          </div>
          <div
           className={style.toggle_btn}
          >
            <button
              onClick={() => setIsWestern(true)}
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                background: isWestern ? "#436CFF" : "transparent",

                border: isWestern ? "1px solid transparent" : "none",
                color: isWestern ? "white" : "black",
              }}
            >
              Western
            </button>

            <button
              onClick={() => setIsWestern(false)}
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                background: isWestern ? "transparent" : "#436CFF",
                border: !isWestern ? "1px solid transparent" : "none",
                color: isWestern ? "black" : "white",
              }}
            >
              Central
            </button>
          </div>
        </div>

        <div className={style.record}>
          <h3 className={style.concession_header}>
            {" "}
            <b>Concession Records(.csv)</b>
          </h3>

          <img
            className={style.line_img_style}
            src="/assets/images/Line 5.png"
          />
          <div className={style.table_col}>
            <h5>ID</h5>
            <h5>Certificate No</h5>
            <h5>Date Created</h5>
            <h5>CSV File</h5>
          </div>
          <div className={style.table_content}>
            <h4>8</h4>
            <h4>Z 0188964 - 0198763</h4>
            <h4>12/05/2023</h4>
            <button
              type="button"
              className={`${style.download_btn} btn btn-success`}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewConcessionRecords;
