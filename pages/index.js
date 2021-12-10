import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../comps/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="main-1 container-fluid">
        <div className="row">
          <div className="col-5">
            <div className={styles.sloganImg}>
              <Image src="/slogan.png" width={800} height={615} alt="" />
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
            <Image src="/events.png" width={1100} height={846} alt="" />
          </div>
        </div>
      </section>

      <section className="main-2">
        <div className="row">
          <div className="col-lg-4">
            <Image
              className="laptop-pic"
              src="/laptop.png"
              width={540}
              height={540}
              alt=""
            />
          </div>
          <div className="col-lg-8">
            <div className="cont">
              <div>
                <Image
                  src="/who_are_we_text.png"
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
      </section>
    </>
  );
}
