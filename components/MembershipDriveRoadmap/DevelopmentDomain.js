import React, { useState } from "react";
import Image from "next/dist/client/image";
import styles from "../../styles/Home.module.css";
import style from "../../styles/MembershipDrivePage/DevelopmentDomain.module.css";
import MembershipDriveRoadmap from "./MembershipDriveRoadmap";
import ToggleButton from "../UIElements/ToggleButton";

const domainButtons = [
  {
    id: 1,
    className: style.web_dev_card,
    devDomainName: "React",

    logo: "/assets/images/React_logo.svg",
    description:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.It is maintained by Meta (formerly Facebook).\nReact is used to build sclable single-page applications. ",
    img_phase2: "/assets/images/Group_web_phase2.png",
    phaseDetails: {
      phase1:
        "HTML , CSS,  JAVASCRIPT (DOM+ES6 VERSION), DOM and Version Control System like Git and Github.\nProject to grasp all the concepts and apply it. ",
      phase2:
        "Get started with Object Oriented Programming(OOP) in Js , React Js and Redux.",
      phase3:
        "Get started with Firebase services.\nMake a fully functional webapp implementing all the concepts learnt in the previous phases.",
    },
  },
  {
    devDomainName: "App Dev",
    id: 2,
    className: style.app_dev_card,
    logo: "/assets/images/Android.webp",

    description:
      "Android is the most widely used mobile OS with more than 70% of market share.\nKotlin and Java are the primary language to build android applications",
    img_phase2: "/assets/images/Android.webp",
    phaseDetails: {
      phase1:
        "Get started with Java and OOP (Object oriented programming).\nLearn VCS (Version control system) like Git and GitHub. Make CLI programs.",
      phase2:
        "Get started with Android Development.\nLearn Android architecture and working with Android Studio.\nMake a simple app.",
      phase3:
        "Get started with Firebase services.\nMake a fully functional app implementing all the concepts learnt in the previous phases.",
    },
  },
  {
    devDomainName: "Flutter",
    id: 3,
    className: style.flutter_dev_card,
    logo: "/assets/images/Flutter_logo.png",
    description:
      "Flutter is a Portable UI framework by Google. You can build for Android, iOS, Web and desktop apps with it.\nDart is the language you will use in Flutter.",
    img_phase2: "/assets/images/Group_Flutter_phase2.png",
    phaseDetails: {
      phase1:
        "Get started with Dart and Java.\nLearn VCS (Version control system) like Git and GitHub.\nMake CLI programs",
      phase2:
        "How Flutter works and some core concepts of Native Dev (Android).\nMake a simple Android and Flutter app.",
      phase3:
        "Get started with Firebase services.\nMake a fully functional app implementing all the concepts learnt in the previous phases.",
    },
  },
];

export default function DevelopmentDomain() {
  const [active, setActive] = useState(1);

  const handleTabOnClick = (e) => {
    setActive(e.target.id);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`container-fluid ${style.devDomainChoiceTitle}`}>
          <Image
            loading="lazy"
            className={style.choose_tool_img}
            alt="choose_tool"
            src="/assets/images/choose_tool_ninja.png"
          />
          <div> Choose your Tool</div>
        </div>
        <div className={`container-fluid ${style.btnGroupWrap}`}>
          <div className="btn-group flex-wrap mt-5" role="group">
            {domainButtons.map((domain) => {
              return (
                <ToggleButton
                  key={domain.id}
                  domain={domain}
                  style={style}
                  styles={styles}
                  state={active}
                  onClick={handleTabOnClick}
                />
              );
            })}
          </div>
        </div>
        <MembershipDriveRoadmap domain={domainButtons[active - 1]} />
      </div>
    </div>
  );
}
