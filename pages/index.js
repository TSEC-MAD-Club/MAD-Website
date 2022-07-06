import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styles1 from "../styles/MembershipDrivePage/MembershipDriveHeader.module.css";
import Navbar from "../components/Navbar/Navbar";
import TeamCard from "../components/TeamCard";
import Footer from "../components/Footer";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(1);

  const handleTabOnClick = (e) => {
    setActive(e.target.id);
  };

  return (
    <>
      <section className="main-1 container-fluid">
        <div className="row section-1">
          <div className="col-5 sloganNbtn">
            {/* <div className="sloganImg">
              <Image
                src="/assets/images/slogan.png"
                width={800}
                height={615}
                alt=""
              />
            </div> */}
            <div className="sloganImg">
              <p
                className="slogan-title"
                style={{ color: "var(--primary-3)" }}
              >
                Build <br/>
                Collaborate <br/>
                Work
              </p>
              <p 
                className="slogan-desc"
                style={{ color: "var(--primary-5)" }}
              >
                on real-life applications with
              </p>
              <p
                className="slogan-club-name"
                style={{ color: "var(--primary-4)" }}
              >
                Developers' Club
              </p>
            </div>

            <div className="button-box">
              <button
                type="button"
                className="btn btn-lg btn-primary ps-5 pe-5"
              >
                JOIN THE FAM
              </button>
              <button
                type="button"
                className="btn btn-lg btn-outline-primary text-white ps-5 pe-5"
              >
                Know More
              </button>
            </div>
          </div>
          <div className="col-7 text-center jumbotron">
            <Image
              src="/assets/images/events.png"
              width={1100}
              height={846}
              alt=""
            />
          </div>
        </div>
      </section>

      <svg viewBox="0 0 1536 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000" d="M 0 189 L 495 144 L 495 0 L 0 0 Z"></path>{" "}
        <path fill="#000" d="M 494 144 L 1048 184 L 1048 0 L 494 0 Z"></path>{" "}
        <path fill="#000" d="M 1047 184 L 1437 136 L 1437 0 L 1047 0 Z"></path>
        <path fill="#000" d="M 1436 136 L 1536 165 L 1536 0 L 1436 0 Z"></path>
        <path
          fill="#181818"
          d="M 0 189 L 495 144 L 495 320 L 0 320 Z"
        ></path>{" "}
        <path
          fill="#181818"
          d="M 494 144 L 1048 184 L 1048 320 L 494 320 Z"
        ></path>{" "}
        <path
          fill="#181818"
          d="M 1047 184 L 1437 136 L 1437 320 L 1047 320 Z"
        ></path>
        <path
          fill="#181818"
          d="M 1436 136 L 1536 165 L 1536 320 L 1436 320 Z"
        ></path>
      </svg>

      <div className="main-2 container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <Image
              className="laptop-pic"
              src="/assets/images/laptop.png"
              width={540}
              height={540}
              alt=""
            />
          </div>
          <div className="col-lg-8">
            <div 
              className="desc-section"
            >
              <div>
                {/* <Image
                  src="/assets/images/who_are_we_text.png"
                  alt=""
                  width={573}
                  height={72}
                /> */}
                <p
                  className="desc-title"
                  style={{ color: "var(--primary-4)" }}
                >
                  WHO ARE WE ?
                </p>
              </div>
              <p className="mt-3" style={{ fontSize: "35px", color: "white" }}>
                A committee more like a{" "}
                <span className={styles.primary2}>community</span>
              </p>
              <br />
              <p style={{ fontSize: "25px", color: "#B8B2A6" }}>
                The MAD (Mobile Developers club) of Thadomal Shahani Engineering
                College was founded by Krishna Dubey with the support of
                co-founders Ankita Kar and Rahul Nair. The committee over the
                years have successfully developed the Tsec official mobile app
                as well as the web app. It is a digital platform that helps in
                binding the TSECites, headed by Dr. G.T. Thampi, prof. Darakshan
                Khan ma&apos;am and prof. Sachi Natu ma&apos;am. The committee
                serves with an objective of creating and trading ideas among the
                dynamic students of TSEC.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.btnGroupWrap}>
        <div className="btn-group flex-wrap mt-5" role="group">
          <button
            type="button"
            id="1"
            className={
              active == 1
                ? `btn ${styles.tabBtn} ${styles.tabBtnActive}`
                : `btn ${styles.tabBtn}`
            }
            onClick={handleTabOnClick}
          >
            Core Committee
          </button>
          <button
            type="button"
            id="2"
            onClick={handleTabOnClick}
            className={
              active == 2
                ? `btn ${styles.tabBtn} ${styles.tabBtnActive}`
                : `btn ${styles.tabBtn}`
            }
          >
            Mentors
          </button>
          <button
            type="button"
            id="3"
            onClick={handleTabOnClick}
            className={
              active == 3
                ? `btn ${styles.tabBtn} ${styles.tabBtnActive}`
                : `btn ${styles.tabBtn}`
            }
          >
            Founders
          </button>
        </div>
      </div>

      <div className={active == 1 ? "d-block" : "d-none"}>
        <div className="container-fluid">
          <div className="text-center mt-5">
            <Image
              src="/assets/images/WebTeam.png"
              alt=""
              width={400}
              height={100}
            />
          </div>
          <div className="card-wrapper">
            <TeamCard
              name={"Mahima Samantara"}
              imagePath={"/assets/images/MahimaWebTeam.png"}
              content={"BE - IT"}
            />

            <TeamCard
              name={"Kavish Shah"}
              imagePath={"/assets/images/KavishWebTeam.jpg"}
              content={"TE - Computer"}
            />
            <TeamCard
              name={"Jay Kaku"}
              imagePath={"/assets/images/JayWebTeam.png"}
              content={"TE - Computer"}
            />
            <TeamCard
              name={"Ritwik Vaidya"}
              imagePath={"/assets/images/RitwikWebTeam.jpeg"}
              content={"BE - Computer"}
            />
          </div>
        </div>

        <div className="container-fluid">
          <div className="text-center mt-5">
            <Image
              src="/assets/images/DatabaseTeam.png"
              alt=""
              width={600}
              height={100}
            />
          </div>
          <div className="card-wrapper">
            <TeamCard
              name={"Ruchit Thaker"}
              imagePath={"/assets/images/RuchitDatabaseTeam.jpg"}
              content={"TE - IT"}
            />
            <TeamCard
              name={"Keyul Jain"}
              imagePath={"/assets/images/KeyulDatabaseTeam.jfif"}
              content={"TE - Computer"}
            />
          </div>
        </div>

        <div className="container-fluid">
          <div className="text-center mt-5">
            <Image
              src="/assets/images/AppTeam.png"
              alt=""
              width={445}
              height={100}
            />
          </div>
          <div className="card-wrapper">
            <TeamCard
              name={"Darshan Rander"}
              imagePath={"/assets/images/DarshanAppTeam.png"}
              content={"TE - IT"}
            />
            <TeamCard
              name={"Tanay Kamath"}
              imagePath={"/assets/images/TanayAppTeam.png"}
              content={"TE - Computer"}
            />
            <TeamCard
              name={"Gaurav Raj"}
              imagePath={"/assets/images/GauravAppTeam.png"}
              content={"TE - Computer"}
            />
            <TeamCard
              name={"Harsh Mody"}
              imagePath={"/assets/images/HarshAppTeam.png"}
              content={"TE - IT"}
            />
          </div>
        </div>

        <div className="container-fluid">
          <div className="text-center mt-5">
            <Image
              src="/assets/images/GraphicsTeam.png"
              alt=""
              width={380}
              height={100}
            />
          </div>
          <div className="card-wrapper">
            <TeamCard
              name={"Pooja Patel"}
              imagePath={"/assets/images/PoojaGraphicsTeam.png"}
              content={"BE - Computer"}
            />
            <TeamCard
              name={"Ishan Saksena"}
              imagePath={"/assets/images/IshanGraphicsTeam.png"}
              content={"TE - Computer"}
            />
          </div>
        </div>

        <div className="container-fluid">
          <div className="text-center mt-5">
            <Image
              src="/assets/images/ContentTeam.png"
              alt=""
              width={682}
              height={120}
            />
          </div>
          <div className="card-wrapper">
            <TeamCard
              name={"Amandeep Chawla"}
              imagePath={"/assets/images/AmandeepContentTeam.png"}
              content={"TE - Chemical"}
            />
          </div>
        </div>

        <svg viewBox="0 0 1536 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000" d="M 0 189 L 495 144 L 495 0 L 0 0 Z"></path>{" "}
          <path fill="#000" d="M 494 144 L 1048 184 L 1048 0 L 494 0 Z"></path>{" "}
          <path
            fill="#000"
            d="M 1047 184 L 1437 136 L 1437 0 L 1047 0 Z"
          ></path>
          <path
            fill="#000"
            d="M 1436 136 L 1536 165 L 1536 0 L 1436 0 Z"
          ></path>
          <path fill="#181818" d="M 0 189 L 495 144 L 495 320 L 0 320 Z"></path>{" "}
          <path
            fill="#181818"
            d="M 494 144 L 1048 184 L 1048 320 L 494 320 Z"
          ></path>{" "}
          <path
            fill="#181818"
            d="M 1047 184 L 1437 136 L 1437 320 L 1047 320 Z"
          ></path>
          <path
            fill="#181818"
            d="M 1436 136 L 1536 165 L 1536 320 L 1436 320 Z"
          ></path>
        </svg>
      </div>

      <div className={active == 2 ? `${styles.tabContentActive}` : "d-none"}>
        
        <TeamCard
              name={"Dr. G. T. Thampi"}
              imagePath={"/assets/images/gtthampi.jpg"}
              content={"Principal"}
            />
            <TeamCard
              name={"Dr. Shachi Natu"}
              imagePath={"/assets/images/shachinatu.jpg"}
              content={"Computer"}
            />
            <TeamCard
              name={"Ms. Darakhshan Khan"}
              imagePath={"/assets/images/darakhshankhan.jpg"}
              content={"Computer"}
            />
            
      </div>

      <div className={active == 3 ? `${styles.tabContentActive}` : "d-none"}>
      <TeamCard
              name={"Krishna Dubey"}
              imagePath={"/assets/images/krishnadubey.jpeg"}
              content={""}
            />
            <TeamCard
              name={"Ankita Kar"}
              imagePath={"/assets/images/ankitakar.jpg"}
              content={""}
            />
            <TeamCard
              name={"Rahul Nair"}
              imagePath={"/assets/images/rahulnair.jpg"}
              content={""}
            />
      </div>
    </>
  );
}
