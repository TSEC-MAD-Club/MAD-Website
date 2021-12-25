import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Navbar from "../components/Navbar/Navbar";
import TeamCard from "../components/TeamCard";
import Footer from "../components/Footer";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(1);

  const handleTabOnClick = e => {
    setActive(e.target.id);
  };

  return (
    <>

      
      <section className="main-1 container-fluid">
        <div className="row">
          <div className="col-5">
            <div className={styles.sloganImg}>
              <Image src="/assets/images/slogan.png" width={800} height={615} alt="" />
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
                className="btn btn-lg btn-outline-primary text-white ms-5 ps-5 pe-5"
              >
                Know More
              </button>
            </div>
          </div>
          <div className="col-7 text-center">
            <Image src="/assets/images/events.png" width={1100} height={846} alt="" />
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
            <div className="cont">
              <div>
                <Image
                  src="/assets/images/who_are_we_text.png"
                  alt=""
                  width={573}
                  height={72}
                />
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
        <div className="btn-group mt-5" role="group">
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

      <div className="container-fluid">
        <div className="text-center mt-5">
          <Image src="/assets/images/WebTeam.png" alt="" width={400} height={100} />
        </div>
        <div className="card-wrapper">
          <TeamCard
            name={"Mahima Samantara"}
            imagePath={"/"}
            year={"BE"}
            branch={"IT"}
          />
          <TeamCard
            name={"Kavish Shah"}
            imagePath={"/assets/images/KavishWebTeam.jpg"}
            year={"TE"}
            branch={"Computer"}
          />
          <TeamCard
            name={"Jay Kaku"}
            imagePath={"/"}
            year={"TE"}
            branch={"Computer"}
          />
          <TeamCard
            name={"Ritwik Vaidya"}
            imagePath={"/"}
            year={"TE"}
            branch={"Computer"}
          />
        </div>
      </div>

      <div className="container-fluid">
        <div className="text-center mt-5">
          <Image src="/assets/images/DatabaseTeam.png" alt="" width={600} height={100} />
        </div>
        <div className="card-wrapper">
          <TeamCard
            name={"Ruchit Thaker"}
            imagePath={"/"}
            year={"TE"}
            branch={"IT"}
          />
          <TeamCard
            name={"Keyul Jain"}
            imagePath={"/"}
            year={"TE"}
            branch={"Computer"}
          />
        </div>
      </div>

      <div className="container-fluid">
        <div className="text-center mt-5">
          <Image src="/assets/images/AppTeam.png" alt="" width={445} height={100} />
        </div>
        <div className="card-wrapper">
          <TeamCard
            name={"Darshan Rander"}
            imagePath={"/"}
            year={"TE"}
            branch={"IT"}
          />
          <TeamCard
            name={"Tanay Kamath"}
            imagePath={"/"}
            year={"TE"}
            branch={"Computer"}
          />
          <TeamCard
            name={"Gaurav Raj"}
            imagePath={"/"}
            year={"TE"}
            branch={"Computer"}
          />
          <TeamCard
            name={"Harsh Mody"}
            imagePath={"/"}
            year={"TE"}
            branch={"IT"}
          />
        </div>
      </div>

      <div className="container-fluid">
        <div className="text-center mt-5">
          <Image src="/assets/images/GraphicsTeam.png" alt="" width={380} height={100} />
        </div>
        <div className="card-wrapper">
          <TeamCard
            name={"Pooja Patel"}
            imagePath={"/"}
            year={"BE"}
            branch={"Computer"}
          />
          <TeamCard
            name={"Ishan Saksena"}
            imagePath={"/"}
            year={"TE"}
            branch={"Computer"}
          />
        </div>
      </div>

      <div className="container-fluid">
        <div className="text-center mt-5">
          <Image src="/assets/images/ContentTeam.png" alt="" width={682} height={120} />
        </div>
        <div className="card-wrapper">
          <TeamCard
            name={"Amandeep Chawla"}
            imagePath={"/"}
            year={"TE"}
            branch={"Chemical"}
          />
        </div>
      </div>

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

    </>
  );
}
