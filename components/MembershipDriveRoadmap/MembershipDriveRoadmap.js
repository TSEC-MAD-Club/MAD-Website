import React from "react";
import style from "../../styles/MembershipDrivepage/MembershipDriveRoadmap.module.css";

export default function MembershipDriveRoadmap(props) {
  return (
    <div className={`container-fluid ${style.membershipDriveRoadmap}`}>
      <div className="row">
        {/* <div>{props.text}</div> */}
        <div className={style.domainInfo}>
          {" "}
          <div className={`container-fluid center ${style.domainTitle}`}>
            <div>
              <img className={style.domainLogo} src={props.domain.logo} />
            </div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                marginLeft: "0.6em",
              }}
            >
              {props.domain.devDomainName}
            </div>
          </div>
          <div className={`container-fluid ${style.descriptionDomain}`}>
            {`${props.domain.description}`.split("\n").map((str, index) => {
              return <div key={index}>{str}</div>;
            })}
          </div>
          <div className={style.roadMap}>
            <div className={`container-fluid ${style.phasePeriod}`}>
              April - May
            </div>
            <div>
              <div className={`row justify-content-md-center ${style.phase}`}>
                <img
                  className={`col col-md-3 ${style.phase1Img}`}
                  alt="Phase 1"
                  src="/assets/images/Phase1_img.png"
                />
                <div className={`col col-md-3 ${style.phaseContent}`}>
                  <div className={style.phaseTitle}>Phase 1</div>
                  <div className={style.phaseDescription}>
                    {props !== undefined
                      ? `${props.domain.phaseDetails.phase1}`
                          .split("\n")
                          .map((str, index) => {
                            return <div key={index}>{str}</div>;
                          })
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className={`container-fluid ${style.phasePeriod}`}>
              June - August
            </div>
            <div>
              <div className={`row justify-content-md-center ${style.phase}`}>
                <div className={`col col-md-3 ${style.phaseContent}`}>
                  <div className={style.phaseTitle}>Phase 2</div>
                  <div className={style.phaseDescription}>
                    {props !== undefined
                      ? `${props.domain.phaseDetails.phase2}`
                          .split("\n")
                          .map((str, index) => {
                            return <div key={index}>{str}</div>;
                          })
                      : ""}
                  </div>
                </div>
                <img
                  className={`col col-md-3 ${style.phase1Img}`}
                  alt="Phase 1"
                  src={props.domain.img_phase2}
                />
              </div>
            </div>
            <div className={`container-fluid ${style.phasePeriod}`}>
              Sept - Nov
            </div>
            <div>
              <div className={`row justify-content-md-center ${style.phase}`}>
                <img
                  className={`col col-md-3 ${style.phase1Img}`}
                  alt="Phase 1"
                  src="/assets/images/Phase3_img.png"
                />
                <div className={`col col-md-3 ${style.phaseContent}`}>
                  <div className={style.phaseTitle}>Phase 3</div>
                  <div className={style.phaseDescription}>
                    {props !== undefined
                      ? `${props.domain.phaseDetails.phase3}`
                          .split("\n")
                          .map((str, index) => {
                            return <div key={index}>{str}</div>;
                          })
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
