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
              <input
                type="text"
                name="title"
                id="title"
                className={styles.inputText}
                placeholder="Enter a task here"
              />
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
              <div className={styles.inputbox}>
                <input type="date" className="date form-control" />{" "}
                <input type="time" className="time form-control" />
              </div>
            </Element>
            <Element title="Add attachments">
              <div className={styles.inputbox}>
                <input type="file" id="actual-btn" name="attachment" hidden />
                <label htmlFor="actual-btn" className={styles.label}>
                  +
                </label>
                <label>Upload From Device</label>
              </div>
            </Element>
            <Element title="Select students" className="box">
              <div className={styles.box}>
                <div className={styles.inputboxdates}>
                  <select>
                    <option selected>Year</option>
                    <option>2018</option>
                    <option>2019</option>
                  </select>
                </div>
                <div className={styles.inputboxdates}>
                  <select>
                    <option selected>Branch </option>
                    <option>IT</option>
                    <option>CO</option>
                  </select>
                </div>
                <div className={styles.inputboxdates}>
                  <select>
                    <option selected>Div</option>
                    <option>G</option>
                    <option>H</option>
                  </select>
                </div>
                <div className={styles.inputboxdates}>
                  <select>
                    <option selected>Batch</option>
                    <option>2018</option>
                    <option>2019</option>
                  </select>
                </div>
              </div>
            </Element>
          </div>
        </div>
      </div>
    </>
  );
}
