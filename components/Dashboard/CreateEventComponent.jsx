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
import Image from "next/image";
import { useEffect } from "react";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";

const EVENT_COMMITTEE_NAME = "Committee Name";
const EVENT_LOCATION = "Event Location";
const EVENT_NAME = "Event Name";
const EVENT_DATE = "Event date";
const EVENT_TIME = "Event Time";
const EVENT_DESCRIPTION = "Event description";
const EVENT_REGISTRATION_LINK = "Event registration url";
const EVENT_IMAGE_URL = "Image url ";
const FIREBASE_EVENT_COLLECTION = "TempEvents";

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
  const [mediaUrl, setMediaUrl] = useState("");
  const [uploadMediaStatus, setMediaUploadStatus] = useState(false);
  const [mediaPath, setMediaPath] = useState("");
  const [media, setMedia] = useState({});
  const { loggedIn, setLoggedIn, user, setUser } =
    React.useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user.type.trim() || user.type != "committee") {
      router.push("/");
    }
  }, [user]);

  const handleEventDetails = (e) => {
    e.preventDefault();

    setEventDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadFile = async (file) => {
    setMedia(file);
    const storage = getStorage();
    const storageRef = ref(storage, "events/" + file.name);

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
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors

        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            toast.notify(`Storage unauthorized`, { type: "error" });
            break;
          case "storage/canceled":
            // User canceled the upload
            toast.notify(`Storage canceled`, { type: "error" });
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            toast.notify(`Storage unknown`, { type: "error" });
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMediaUploadStatus(true);
          setMediaPath(downloadURL);
          setEventDetails((prev) => ({
            ...prev,
            [EVENT_IMAGE_URL]: downloadURL,
          }));
        });
      }
    );
  };

  const setNotification = async () => {
    try {
      const docRef = await addDoc(collection(db, FIREBASE_EVENT_COLLECTION), {
        ...eventDetails,
      });
      toast.notify(`Submitted response`, { type: "success" });
      setEventDetails(initialDetails);
      setMediaUploadStatus(false);
      setMediaUrl("");
    } catch (err) {
      toast.notify(`Submit failed ${err}`, { type: "error" });
    }

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
    } else if (eventDetails[EVENT_TIME].trim().length === 0) {
      toast.notify(`Please add event time`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_DATE].trim().length === 0) {
      toast.notify(`Please add event date`, { type: "error" });

      return;
    } else if (eventDetails[EVENT_IMAGE_URL].trim().length === 0) {
      toast.notify(`Please add event image`, { type: "error" });

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
                <option value={"TSEC E-Cell"}>TSEC E-Cell</option>
                <option value={"TSEC Codetantra"}>TSEC Codetantra</option>
                <option value={"IIC"}>IIC</option>
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
          <Element title="Event registration link">
            <input
              cols="30"
              rows="5"
              placeholder="Enter event registration link"
              className={styles.inputText}
              name={EVENT_REGISTRATION_LINK}
              value={eventDetails[EVENT_REGISTRATION_LINK]}
              onChange={handleEventDetails}
            />
            <p style={{ color: "rgb(255, 12, 19)" }}>
              Please upload the full url, Don't upload shortened url
            </p>
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
                onChange={(e) => {
                  uploadFile(e.target.files[0]);
                }}
                id="actual-btn"
                name={EVENT_IMAGE_URL}
                hidden
              />
              <label htmlFor="actual-btn" className={styles.label}>
                +
              </label>
              <label>Upload From Device</label>
            </div>
            <p style={{ color: "rgb(255, 12, 19)" }}>
              Image Dimension : 1080x1350, 1080x680, 1080x1080 *
            </p>
            {uploadMediaStatus && (
              <>
                <p style={{ color: "#fff", marginTop: "5px" }}>
                  Uploaded {media.name}
                </p>
                <div
                  style={{
                    background: "white",
                    width: "180px",
                    marginTop: "12px",
                  }}
                >
                  <img src={mediaPath} width="100%" height={"100%"} alt="" />
                </div>
              </>
            )}
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
