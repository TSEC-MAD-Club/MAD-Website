import Head from "next/head";
import styles from "../styles/Dashboard/Dashboard.module.css";

function Element(props) {
  return (
    <>
      <div className={styles.reminderElementTitle}>{props.title}</div>
      <div className={styles.reminderElementBody}>{props.children}</div>
    </>
  );
}

export default function Dashboard(props) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={styles.reminder}>
        <div className={styles.reminderTitle}>New Reminder</div>
        <div className={styles.reminderBody}>
          <div className={styles.reminderBodyLeft}>

            <Element title="Title of Reminder">
              <input type="text" name="title" id="title" className={styles.inputText} style={{"borderColor": "#285580"}} placeholder="Enter a task here" />
            </Element>
            <Element title="Description">
              <textarea
                name="decription"
                id="decription"
                cols="30"
                rows="5"
                placeholder="Enter details here"
                className={styles.inputText}
              ></textarea>
            </Element>
          </div>
          <div className={styles.reminderBodyRight}>
            <Element title="Select date and time">
              date time selector Dropdown element
            </Element>
            <Element title="Add attachments">
              <input type="file" name="attachment" id="attachment" />
            </Element>
            <Element title="Select students">Dropdown element</Element>
          </div>
        </div>
      </div>
    </>
  );
}