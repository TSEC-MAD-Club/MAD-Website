import Image from "next/image";
import { InView } from "react-intersection-observer";
import styles from "../styles/MembershipDrivePage/TeamCard.module.css";

const TeamCard = ({ name, imagePath, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={`card ${styles.teamCardSize}`}>
        <InView rootMargin="100px" triggerOnce={true}>
          {({ inView, ref }) => {
            return (
              <div ref={ref}>
                <Image
                  className="card-img-top ll"
                  src={inView ? imagePath : "/assets/images/300x300.webp"}
                  alt=""
                  width={300}
                  height={300}
                />
              </div>
            );
          }}
        </InView>
        <div className="card-body card-background">
          <h5 className="card-title text-center text-white">
            {name.split(" ").map((ele, i) => (
              <div key={i}>{ele}</div>
            ))}
          </h5>
          <p className="card-text text-center text-secondary">{content}</p>
        </div>
        <div
          style={{
            width: "100%",
            height: "60px",
            position: "relative",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              background: "url(/assets/images/zigzag.svg) no-repeat",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
