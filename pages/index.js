import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import styles1 from "../styles/MembershipDrivePage/MembershipDriveHeader.module.css";
import Navbar from "../components/Navbar/Navbar";

import { InView } from "react-intersection-observer";

import TeamCard from "../components/TeamCard";

import React, { useState } from "react";

const StaticData = React.memo(function StaticPage() {
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
            <InView rootMargin="100px" triggerOnce={true}>
              {({ inView, ref }) => {
                return (
                  <div ref={ref}>
                    <Image
                      className="laptop-pic ll"
                      src={
                        inView
                          ? "/assets/images/laptop.png"
                          : "/assets/images/540x540.webp"
                      }
                      width={540}
                      height={540}
                      alt=""
                    />
                  </div>
                );
              }}
            </InView>
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
    </>
  );
});

export default function Home() {
  const [active, setActive] = useState(1);
  const [state, _] = useState([
    {
      id: 1,
      name: "Core Committee",
      teams: [
        {
          id: 1,
          name: "Web Team",
          title: "Web Dev Team",
          member: [
            {
              id: 1,
              name: "Mahima Samantara",
              imagePath: "/assets/images/MahimaWebTeam.png",
              content: "BE - IT",
            },
            {
              id: 2,
              name: "Kavish Shah",
              imagePath: "/assets/images/KavishWebTeam.jpg",
              content: "BE - Computer",
            },
            {
              id: 3,
              name: "Jay Kaku",
              imagePath: "/assets/images/JayWebTeam.png",
              content: "BE - Computer",
            },
            {
              id: 4,
              name: "Ritwik Vaidya",
              imagePath: "/assets/images/RitwikWebTeam.jpeg",
              content: "BE - Computer",
            },
          ],
        },
        {
          id: 2,
          name: "Database team",
          title: "Database Mangement Team",
          member: [
            {
              id: 1,
              name: "Ruchit Thaker",
              imagePath: "/assets/images/RuchitDatabaseTeam.jpg",
              content: "BE - IT",
            },
            {
              id: 2,
              name: "Keyul Jain",
              imagePath: "/assets/images/KeyulDatabaseTeam.jfif",
              content: "BE - Computer",
            },
          ],
        },
        {
          id: 3,
          name: "App Team",
          title: "App Dev Team",
          member: [
            {
              id: 1,
              name: "Darshan Rander",
              imagePath: "/assets/images/DarshanAppTeam.png",
              content: "BE - IT",
            },
            {
              id: 2,
              name: "Tanay Kamath",
              imagePath: "/assets/images/TanayAppTeam.png",
              content: "BE - Computer",
            },
            {
              id: 3,
              name: "Gaurav Raj",
              imagePath: "/assets/images/GauravAppTeam.png",
              content: "BE - Computer",
            },
            {
              id: 4,
              name: "Harsh Mody",
              imagePath: "/assets/images/HarshAppTeam.png",
              content: "BE - IT",
            },
          ],
        },
        {
          id: 4,
          name: "Graphics team",
          title: "Graphics Team",
          member: [
            {
              id: 1,
              name: "Pooja Patel",
              imagePath: "/assets/images/PoojaGraphicsTeam.png",
              content: "BE - Computer",
            },
            {
              id: 2,
              name: "Ishan Saksena",
              imagePath: "/assets/images/IshanGraphicsTeam.png",
              content: "BE - Computer",
            },
          ],
        },
        {
          id: 5,
          name: "Content team",
          title: "Content and Social Media Team",
          member: [
            {
              id: 1,
              name: "Amandeep Chawla",
              imagePath: "/assets/images/AmandeepContentTeam.png",
              content: "BE - Chemical",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Mentor",
      teams: [
        {
          id: 1,
          name: "Mentor Team",
          title: "Mentors",
          member: [
            {
              id: 1,
              name: "Dr. G. T. Thampi",
              imagePath: "/assets/images/gtthampi.jpg",
              course: "Principal",
            },
            {
              id: 2,
              name: "Dr. Shachi Natu",
              imagePath: "/assets/images/shachinatu.jpg",
              course: "Computer",
            },
            {
              id: 3,
              name: "Ms. Darakhshan Khan",
              imagePath: "/assets/images/darakhshankhan.jpg",
              course: "Computer",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Founder",
      teams: [
        {
          id: 1,
          name: "Mentor Team",
          imagePath: "/assets/images/WebTeam.png",
          title: "Founders",
          member: [
            {
              id: 1,
              name: "Krishna Dubey",
              imagePath: "/assets/images/krishnadubey.jpeg",
              course: "",
            },
            {
              id: 2,
              name: "Ankita Kar",
              imagePath: "/assets/images/ankitakar.jpg",
              course: "",
            },
            {
              id: 3,
              name: "Rahul Nair",
              imagePath: "/assets/images/rahulnair.jpg",
              course: "",
            },
          ],
        },
      ],
    },
  ]);

  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => setState(data));
  // }, []);

  const handleTabOnClick = (e) => {
    setActive(e.target.id);
  };

  return (
    <>
      <StaticData />
      <div className={styles.btnGroupWrap}>
        <div className="btn-group mt-5" role="group">
          {state.map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={tab.id}
              className={
                active == tab.id
                  ? `btn tab-btn ${styles.tabBtn} ${styles.tabBtnActive}`
                  : `btn tab-btn ${styles.tabBtn}`
              }
              onClick={handleTabOnClick}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {state.map((tab) => (
        <div
          key={tab.id}
          className={
            active == tab.id
              ? // ? `${styles.tabContentActive} opacity one`
                // : "opacity zero abs"
                `${styles.tabContentActive}`
              : "d-none"
          }
        >
          {tab.teams.map((team, i) => (
            <div
              key={team.id}
              className={"container-fluid " + active == tab.id ? "abs" : ""}
            >
              <div className="text-center mt-5">
                <InView rootMargin="100px" triggerOnce={true}>
                  {({ inView, ref }) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "5rem",
                        }}
                        ref={ref}
                      >
                        <div style={{ marginRight: "10px" }}>{"["}</div>
                        <div
                          style={{
                            fontSize: "2rem",
                            fontFamily: "var(--title-font)",
                            transform: "translateY(10px)",
                            color:
                              i % 2 == 0
                                ? "var(--primary-3)"
                                : "var(--primary-4)",
                          }}
                        >
                          {team.title}
                        </div>
                        <div style={{ marginLeft: "10px" }}>{"]"}</div>
                      </div>
                    );
                  }}
                </InView>
              </div>
              <div className={`card-wrapper grid-${team.member.length}`}>
                {team.member.map((member) => (
                  <TeamCard
                    key={member.id}
                    name={member.name}
                    imagePath={member.imagePath}
                    content={member.content}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
