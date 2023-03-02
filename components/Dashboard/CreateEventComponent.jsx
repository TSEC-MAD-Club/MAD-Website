import React, { useState } from "react";
import styles from "../../styles/Dashboard/Dashboard.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";
import "firebase/storage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const EVENT_COMMITTEE_NAME = "Committee Name";
const EVENT_LOCATION = "Event Location";
const EVENT_NAME = "Event Name";
const EVENT_DATE = "Event date";
const EVENT_TIME = "Event Time";
const EVENT_DESCRIPTION = "Event description";
const EVENT_REGISTRATION_LINK = "Event registration url";
const EVENT_IMAGE_URL = "Image url ";
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
  const [mediaUrl, setMeidaUrl] = useState("");
  const [uploadMediaStatus, setMediaUploadStatus] = useState(false);

  const handleEventDetails = (e) => {
    e.preventDefault();

    setEventDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadFile = async (file) => {
    setMediaUploadStatus(true);
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMeidaUrl(downloadURL);
          setMediaUploadStatus(false);
          setEventDetails((prev) => ({
            ...prev,
            [EVENT_IMAGE_URL]: downloadURL,
          }));
        });
      }
    );
  };

  const setNotification = async () => {
    const docRef = await addDoc(collection(db, FIREBASE_EVENT_COLLECTION), {
      ...eventDetails,
    });

    toast.notify(`Submitted response`, { type: "success" });
    setEventDetails(initialDetails);
    setMediaUploadStatus(false);
    setMeidaUrl("");
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                <option value={"Dev's Club"}>Dev's Club</option>
                <option value={"TSEC Codecell"}>TSEC Codecell</option>
                <option value={"TSEC Codetantra"}>TSEC Codetantra</option>
                <option value={"ISTE-TSEC"}>ISTE-TSEC</option>
                <option value={"NSS-TSEC"}>NSS-TSEC</option>
                <option value={"TSEC Sports Committee"}>
                  TSEC Sports Committee
                </option>
                <option value={"TSEC Student Council"}>
                  TSEC Student Council
                </option>
                <option value={"CSI-TSEC"}>CSI-TSEC</option>
                <option value={"RC-TSEC"}>RC-TSEC</option>
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

          <Element title="Add attachments *">
            <div className={styles.inputbox}>
              <input
                type="file"
                id="actual-btn"
                name={EVENT_IMAGE_URL}
                onChange={async (e) => {
                  let val = await uploadFile(e.target.files[0]);
                }}
                hidden
              />
              <label htmlFor="actual-btn" className={styles.label}>
                +
              </label>
              <label>Upload From Device</label>
            </div>
            {mediaUrl && (
              <div
                style={{
                  background: "white",
                  width: "180px",
                  marginTop: "12px",
                }}
              >
                <img src={mediaUrl} width="100%" alt="" />
              </div>
            )}
            {uploadMediaStatus && <p style={{ color: "#fff" }}>Loading...</p>}
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

/*

case "TSEC Codestorm":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2FCodeStorm_logo.png?alt=media&token=5ce893a0-ecf4-4524-97c6-83bfa8f4d1d7";

    case "Dev's Club":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2FDevs_club%20logo.png?alt=media&token=4d73670f-c753-48ee-92b4-84a1b53a462c";

    case "Xeuron-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2FXeuron-tsec.jpeg?alt=media&token=4cada1c0-8984-47e1-b145-d376aa3416d7";

    case "CSI-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fcsi-tsec.jpg?alt=media&token=b0897ca6-b54c-4b26-81c1-71f3105de53d";

    case "IEEE-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fieee_tsec.jpg?alt=media&token=e8d91977-ff63-4d0d-af03-c86fc59227b4";

    case "IETE-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fiete-tsec.jpg?alt=media&token=e52eb59d-6d51-43d8-a041-7fcd79b48ef1";

    case "ISTE-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fiste-tsec.jpg?alt=media&token=408ace7c-f28a-4986-be04-40c18b706660";

    case "TSEC-MCL":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fmcl-tsec.jpg?alt=media&token=835cf7cc-e8e1-48ce-9f4d-7ef721ef6247";

    case "MS-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fms-tsec.jpg?alt=media&token=56985117-de99-4c2d-ba5f-90c39f08a479";

    case "NSS-TSEC":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fnss-tsec.png?alt=media&token=01df2d46-11e4-49f8-9dc9-d287caf31c5d";

    case "TSEC Sports Committee":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Fsports_com.png?alt=media&token=f6ca8fdf-04c7-4062-a97e-4cacb1888e6c";

    case "TSEC Codecell":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Ftsec_code_cell.png?alt=media&token=b3c4df91-1b74-4957-bd8b-e1762406b036";

    case "TSEC E-Cell":
      return "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/committees%2Ftsec_e_cell.png?alt=media&token=76f25a18-c191-4cf7-824f-fc52202ed7d5";
*/
