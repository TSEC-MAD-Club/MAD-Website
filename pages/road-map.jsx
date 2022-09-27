import Head from "next/head";
import React from "react";
import styles from "../styles/Resources/Resources.module.css";

const data = [
  {
    domain: "web",
    id: "1",
    title: "Web Dev",
    description:
      "As to get started with web, dart is the programming language which is used to make flutter UIs as well as applications. So here are some topics listed below you before starting with app development.",
    getting_started: [
      "Variables, Null safety.",
      "Built in types, sets, maps, lists.",
      "Conditionals, logic relational operator loops.",
      "Object oriented programming concepts- Encapsulation, inheritance, Polymorphism, abstract class.",
    ],
    img: "https://i.ibb.co/SR3zg9y/logo1.png",
    resources: [],
    video_tutorials: [],
    tasks: [
      {
        title: "Make a Quiz console app",
        description: "Make a quiz console app using dart",
        deadline: "2021-10-10",
        referance: "https://www.youtube.com/watch?v=UV_ULe7dZuE",
      },
      {
        title: "Make a Quiz console app",
        description: "Make a quiz console app using dart",
        deadline: "2021-10-10",
        referance: "https://www.youtube.com/watch?v=UV_ULe7dZuE",
      },
      {
        title: "Make a Quiz console app",
        description: "Make a quiz console app using dart",
        deadline: "2021-10-10",
        referance: "https://www.youtube.com/watch?v=UV_ULe7dZuE",
      },
      {
        title: "Make a Quiz console app",
        description: "Make a quiz console app using dart",
        deadline: "2021-10-10",
        referance: "https://www.youtube.com/watch?v=UV_ULe7dZuE",
      },
      {
        title: "Make a Quiz console app",
        description: "Make a quiz console app using dart",
        deadline: "2021-10-10",
        referance: "https://www.youtube.com/watch?v=UV_ULe7dZuE",
      },
    ],
  },
  {
    domain: "app",
    id: "2",
    title: "App Dev",
    description:
      "As to get started with app, dart is the programming language which is used to make flutter UIs as well as applications. So here are some topics listed below you before starting with app development.",
    getting_started: [
      "Variables, Null safety.",
      "Built in types, sets, maps, lists.",
      "Conditionals, logic relational operator loops.",
      "Object oriented programming concepts- Encapsulation, inheritance, Polymorphism, abstract class.",
    ],
    img: "https://i.ibb.co/j8RqNj8/image-36.png",
    resources: [],
    video_tutorials: [],
    tasks: [],
  },
  {
    domain: "flutter",
    id: "3",
    title: "Flutter",
    description:
      "As to get started with flutter, dart is the programming language which is used to make flutter UIs as well as applications. So here are some topics listed below you before starting with app development.",
    getting_started: [
      "Variables, Null safety.",
      "Built in types, sets, maps, lists.",
      "Conditionals, logic relational operator loops.",
      "Object oriented programming concepts- Encapsulation, inheritance, Polymorphism, abstract class.",
    ],
    img: "https://i.ibb.co/NYqt4vM/Flutter.png",
    resources: [],
    video_tutorials: [],
    tasks: [],
  },
];

function Task(props) {
  return (
    <>
      <div style={{ color: "#fff" }}>
        <div className={styles.flex}>
          <h4>Tasks</h4>
          <div className={`${styles.taskGrid} grid-4`}>
            {props.domain_detail.tasks?.map((task, index) => (
              <div key={index} className={`${styles.taskBox} task-card`}>
                <div className={styles.taskTitle}>{task.title}</div>
                {/* <p className={styles.ellipsis}>
                  Referance Link: {task.referance}
                </p> */}
                <iframe
                  src="https://www.youtube.com/embed/UV_ULe7dZuE"
                  title="How to Build Simple Search in Flutter App"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Resources() {
  const [domain_detail, setDomainDetails] = React.useState(data[0]);
  const [toggleGettingStarted, setToggleGettingStarted] = React.useState(false);
  const [toggleResources, setToggleResources] = React.useState(false);
  const [toggleVideoTutorials, setToggleVideoTutorials] = React.useState(false);

  const handleDomainClick = (index) => {
    setDomainDetails(data[index]);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Road Map</title>
      </Head>
      {/* Navbar */}

      {/* Resources to learn intro */}

      {/* Pick domain */}
      <div style={{ color: "#fff" }} className="resource-main">
        <h2>Pick your domain</h2>
        <div className="resource-box">
          {data.map((domain_object, index) => (
            <div
              key={domain_object.id}
              className="bx"
              onClick={() => handleDomainClick(index)}
            >
              <div className="object"></div>
              <div className="object2"></div>
              {domain_object.title}
              <img src={domain_object.img} />
            </div>
          ))}
        </div>
      </div>

      {/* Show details of domain */}
      <div style={{ color: "#fff" }}>
        <h2>{domain_detail.title}</h2>
        <p>{domain_detail.description}</p>

        <div onClick={() => setToggleGettingStarted((prev) => !prev)}>
          <h4>Getting Started</h4>
          {toggleGettingStarted && (
            <ul>
              {domain_detail.getting_started?.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          )}
        </div>
        <div onClick={() => setToggleResources((prev) => !prev)}>
          <h4>Resources</h4>
          {toggleResources && (
            <ul>
              {domain_detail.resources?.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          )}
        </div>
        <div onClick={() => setToggleVideoTutorials((prev) => !prev)}>
          <h4>Video tutorials</h4>
          {toggleVideoTutorials && (
            <ul>
              {domain_detail.video_tutorials?.map((tutorial, index) => (
                <li key={index}>Need to figure out </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Task */}
      <Task domain_detail={domain_detail} />

      {/* Detail section for particular domain */}
    </React.Fragment>
  );
}
