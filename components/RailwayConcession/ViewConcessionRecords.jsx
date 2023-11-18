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
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              flexDirection: "column",
              marginTop: "2%",
              margin: "0 auto",
              paddingLeft: "14%",
              gap: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                paddingTop: "3%",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              <img src="/assets/images/Dashboard.png" />
              <span>Dashboard</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                paddingTop: "3%",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              <img src="/assets/images/Bell.png" />
              <span>Create Notifications</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                paddingTop: "3%",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              <img src="/assets/images/Bell.png" />
              <span>Past Notifications</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                fontSize: "20px",
                paddingTop: "3%",
                fontWeight: "400",
              }}
            >
              <img src="/assets/images/Notes.png" />
              <span>Create Notes</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                fontSize: "20px",
                paddingTop: "3%",
                fontWeight: "400",
              }}
            >
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
              style={{
                fontSize: "36px",
                fontWeight: 200,
                display: "flex",
              }}
            >
              View CSV Files
            </h1>
            <h6
              style={{ fontSize: "16px", fontWeight: "400", color: "#717171" }}
            >
              View or Download csv files of concession records
            </h6>
          </div>

          <div style={{ position: "relative" }}>
            <input
              placeholder="Enter Certificate Number"
              type="text"
              style={{
                marginTop: "8px",
                alignItems: "center",

                width: "295px",
                height: "45px",
                paddingLeft: "20px",
                borderRadius: "5px",
                border: "1px solid black",
              }}
            ></input>
            <span
              style={{
                position: "absolute",
                right: "11px",
                top: "35%",
                transform: "translateY(-50%)",
                fontSize: "24px",
              }}
            >
              <img src="\assets/images/search.png" />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #A09C9C",
              width: "200px",
              borderRadius: "50px",
              marginLeft: "100px",
              height: "61px",
              background: "#FFFFFF",
            }}
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
          <h3
            style={{
              marginLeft: "8%",
              paddingTop: "3%",
              color: "#000000",
              fontFamily: "Inter",
            }}
          >
            {" "}
            <b>Concession Records(.csv)</b>
          </h3>

          <img
            style={{ width: "90%", marginLeft: "4%" }}
            src="/assets/images/Line 5.png"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 65px",
              fontSize: "20px",
              color: "#717171",
            }}
          >
            <h5>ID</h5>
            <h5>Certificate No</h5>
            <h5>Date Created</h5>
            <h5>CSV File</h5>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 64px",
            }}
          >
            <h4>8</h4>
            <h4>Z 0188964 - 0198763</h4>
            <h4>12/05/2023</h4>
            <button
              type="button"
              style={{
                backgroundColor: "#00C720",
                width: "120px",
                height: "37px",
              }}
              className="btn btn-success"
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
