import styles from "../styles/Home.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="container-fluid footer pt-5" id="reach-us">
      <div className="row">
        <div className="col-4 text-center">
          <h2 className={styles.primary1}>
            {" "}
            <span className={styles.primary2}>Did</span> we miss anything?
          </h2>
          <p className="text-white">
            Reach out to us at <b>madclub@gmail.com</b>
          </p>
        </div>
        <div className="col-2">
          <ul className="text-white">
            <a>Home</a>
            <a>About Us</a>
            <a>Projects</a>
            <a>Roadmap</a>
            <a>Members</a>
            <a>Reach Us</a>
          </ul>
        </div>
        <div className="col-2">
          <ul className="text-white">
            <a>Events</a>
            <a>Membership Drive</a>
            <a>Workshops</a>
            <a>Internship Mela</a>
          </ul>
        </div>
        <div className="col-4">
          <Image src="/assets/images/Map.png" alt="" width={380} height={230} />
          <p className="text-white" style={{ maxWidth: "400px" }}>
            <b>Thadomal Shahani Engineering College</b>, W, P. G. Kher Marg, Off
            Linking Rd, TPS III, Bandra West, Mumbai, Maharashtra - 400050
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
