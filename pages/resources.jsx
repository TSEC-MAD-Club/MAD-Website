import React from "react";

const data = [
  {
    domain: "web",
    id: "1",
    title: "Web Dev",
    description:
      "As to get started with flutter, dart is the programming language which is used to make flutter UIs as well as applications. So here are some topics listed below you before starting with app development.",
    getting_started: [
      "Variables, Null safety.",
      "Built in types, sets, maps, lists.",
      "Conditionals, logic relational operator loops.",
      "Object oriented programming concepts- Encapsulation, inheritance, Polymorphism, abstract class.",
    ],
    resources: [],
    video_tutorials: [],
  },
  {
    domain: "app",
    id: "2",
    title: "App Dev",
    description:
      "As to get started with flutter, dart is the programming language which is used to make flutter UIs as well as applications. So here are some topics listed below you before starting with app development.",
    getting_started: [
      "Variables, Null safety.",
      "Built in types, sets, maps, lists.",
      "Conditionals, logic relational operator loops.",
      "Object oriented programming concepts- Encapsulation, inheritance, Polymorphism, abstract class.",
    ],
    resources: [],
    video_tutorials: [],
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
    resources: [],
    video_tutorials: [],
  },
];

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
      {/* Navbar */}

      {/* Resources to learn intro */}

      {/* Pick domain */}
      <div style={{ color: "#fff" }}>
        <h2>Pick your domain</h2>

        {data.map((domain_object, index) => (
          <div key={domain_object.id} onClick={() => handleDomainClick(index)}>
            {domain_object.title}
          </div>
        ))}
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

      {/* Detail section for particular domain */}
    </React.Fragment>
  );
}
