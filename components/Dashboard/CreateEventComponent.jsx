import React, { useState } from "react";
import styles from "../../styles/Dashboard/Dashboard.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";
import "firebase/storage";
import { getStorage } from "firebase/storage";

const EVENT_COMMITTEE_NAME = "Committee Name";
const EVENT_LOCATION = "Event Location";
const EVENT_NAME = "Event Name";
const EVENT_DATE = "Event date";
const EVENT_TIME = "Event Time";
const EVENT_DESCRIPTION = "Event description";
const EVENT_REGISTRATION_LINK = "Event registration link";
const EVENT_IMAGE_URL = "Image url";
const FIREBASE_EVENT_COLLECTION = "Events";

const initialDetails = {
  [EVENT_COMMITTEE_NAME]: "",
  [EVENT_LOCATION]: "",
  [EVENT_NAME]: "",
  [EVENT_DATE]: "",
  [EVENT_TIME]: "",
  [EVENT_DESCRIPTION]: "",
  [EVENT_REGISTRATION_LINK]: "",
  [EVENT_IMAGE_URL]: "",
};

function Element(props) {
  return (
    <>
      <div className={styles.reminderElementTitle}>{props.title}</div>
      <div className={styles.reminderElementBody}>{props.children}</div>
    </>
  );
}

function CreateEventComponent() {
  const [eventDetails, setEventDetails] = useState(initialDetails);

  const handleEventDetails = (e) => {
    e.preventDefault();

    setEventDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadFile = async (file) => {
    const storage = getStorage();
    const storageRef = storage.ref();
    const folderRef = storageRef.child("common_notification");
    const fileRef = folderRef.child(file.name);
    try {
      const snapshot = await fileRef.put(file);
      return snapshot.ref.getDownloadURL();
    } catch (error) {
      console.error(error);
    }
  };

  const setNotification = async () => {
    const docRef = await addDoc(collection(db, FIREBASE_EVENT_COLLECTION), {
      ...eventDetails,
    });

    toast.notify(`Submitted response`, { type: "success" });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(eventDetails);

    if (eventDetails[EVENT_COMMITTEE_NAME].trim().length === 0) {
      toast.notify(`Please add title`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_LOCATION].trim().length === 0) {
      toast.notify(`Please add location`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_NAME].trim().length === 0) {
      toast.notify(`Please add event name`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_DESCRIPTION].trim().length === 0) {
      toast.notify(`Please add description`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_REGISTRATION_LINK].trim().length === 0) {
      toast.notify(`Please add registration link`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_TIME].trim().length === 0) {
      toast.notify(`Please add event time`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_DATE].trim().length === 0) {
      toast.notify(`Please add event date`, { type: "error" });

      return;
    }

    setNotification();

    return;
  };

  return (
    <div className={styles.reminder}>
      <div className={styles.reminderTitle}>New Event</div>

      <div className={styles.reminderBody}>
        <div className={styles.reminderBodyLeft}>
          <Element title="Comittee Name *">
            <div className={[styles.committeeName]}>
              <select
                onChange={handleEventDetails}
                value={eventDetails[EVENT_COMMITTEE_NAME]}
                name={EVENT_COMMITTEE_NAME}
                style={{ minWidth: "100%" }}
              >
                <option value={""}>Select commitee name</option>
                <option value={"Dev's club"}>Dev's club</option>
                <option value={"Code cell"}>Code cell</option>
              </select>
            </div>
          </Element>
          <Element title="Event Location *">
            <input
              name={EVENT_LOCATION}
              cols="30"
              rows="5"
              placeholder="Enter event location"
              className={styles.inputText}
              value={eventDetails[EVENT_LOCATION]}
              onChange={handleEventDetails}
            />
          </Element>
          <Element title="Event Name *">
            <input
              name={EVENT_NAME}
              cols="30"
              rows="5"
              placeholder="Enter event name"
              className={styles.inputText}
              value={eventDetails[EVENT_NAME]}
              onChange={handleEventDetails}
            />
          </Element>
          <Element title="Event description *">
            <textarea
              cols="30"
              rows="5"
              placeholder="Enter event description"
              className={styles.inputText}
              name={EVENT_DESCRIPTION}
              value={eventDetails[EVENT_DESCRIPTION]}
              onChange={handleEventDetails}
            ></textarea>
          </Element>
        </div>
        <div className={styles.reminderBodyRight}>
          <Element title="Event registration link *">
            <input
              cols="30"
              rows="5"
              placeholder="Enter event registration link"
              className={styles.inputText}
              name={EVENT_REGISTRATION_LINK}
              value={eventDetails[EVENT_REGISTRATION_LINK]}
              onChange={handleEventDetails}
            />
          </Element>
          <Element title="Select date and time">
            <div className={styles.inputbox}>
              <input
                type="date"
                name={EVENT_DATE}
                value={eventDetails[EVENT_DATE]}
                onChange={handleEventDetails}
                className="date form-control"
              />{" "}
              <input
                type="time"
                name={EVENT_TIME}
                value={eventDetails[EVENT_TIME]}
                onChange={handleEventDetails}
                className="time form-control"
              />
            </div>
          </Element>

          <Element title="Add attachments (Optional)">
            <div className={styles.inputbox}>
              <input
                type="file"
                id="actual-btn"
                name={EVENT_IMAGE_URL}
                value={eventDetails[EVENT_IMAGE_URL]}
                onChange={handleEventDetails}
                hidden
              />
              <label htmlFor="actual-btn" className={styles.label}>
                +
              </label>
              <label>Upload From Device</label>
            </div>
          </Element>
        </div>
      </div>

      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
}

export default CreateEventComponent;
