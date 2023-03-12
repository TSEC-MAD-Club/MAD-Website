import React, { useState } from "react";
import styles from "../styles/Dashboard/Dashboard.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-nextjs-toast";
import "firebase/storage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "next/router";

const notificationTopic = {
  3: {
    Comps: {
      C1: ["C11", "C12", "C13", "C14", "all"],
      C2: ["C21", "C22", "C23", "C24", "all"],
      C3: ["C31", "C32", "C33", "C34", "all"],
      all: [],
    },
    It: {
      T1: ["T11", "T12", "T13", "T14", "all"],
      T2: ["T21", "T22", "T23", "T24", "all"],
      all: [],
    },
    Extc: {
      A: ["A1", "A2", "A3", "all"],
      all: [],
    },
    Chem: {
      K: ["K1", "K2", "K3", "all"],
      all: [],
    },
    Aids: {
      T: ["T1", "T2", "T3", "all"],
      all: [],
    },
    all: {},
  },
  4: {
    Comps: {
      C1: ["C11", "C12", "C13", "C14", "all"],
      C2: ["C21", "C22", "C23", "C24", "all"],
      C3: ["C31", "C32", "C33", "C34", "all"],
      all: [],
    },
    It: {
      B1: ["B11", "B12", "B13", "B14", "all"],
      B2: ["B21", "B22", "B23", "B24", "all"],
      all: [],
    },
    Chem: {
      K: ["K1", "K2", "K3", "all"],
      all: [],
    },
    Extc: {
      A: ["A1", "A2", "A3", "all"],
      all: [],
    },
    all: {},
  },
  2: {
    Comps: {
      C1: ["C11", "C12", "C13", "C14", "all"],
      C2: ["C21", "C22", "C23", "C24", "all"],
      C3: ["C31", "C32", "C33", "C34", "all"],
      all: [],
    },
    It: {
      S1: ["S11", "S12", "S13", "S14", "all"],
      S2: ["S21", "S22", "S23", "S24", "all"],
      all: [],
    },
    Aids: {
      S1: ["S11", "S12", "S13", "S14", "all"],
      S2: ["S21", "S22", "S23", "S24", "all"],
      all: [],
    },
    Chem: {
      K: ["K1", "K2", "K3", "all"],
      all: [],
    },
    Extc: {
      A: ["A1", "A2", "A3", "all"],
      all: [],
    },
    all: {},
  },
  all: {},
};

const yearClass = {
  1: "First Year",
  2: "Second Year",
  3: "Third Year",
  4: "Fourth Year",
  all: "All",
};

function Element(props) {
  return (
    <>
      <div className={styles.reminderElementTitle}>{props.title}</div>
      <div className={styles.reminderElementBody}>{props.children}</div>
    </>
  );
}

function SendNotes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("all");
  const [year, setYear] = useState("all");
  const [mediaPath, setMediaPath] = useState("");
  const [media, setMedia] = useState("");
  const [uploadMediaStatus, setMediaUploadStatus] = useState(false);
  const [division, setDivision] = useState("all");
  const [batch, setBatch] = useState("all");
  const router = useRouter();

  useEffect(() => {
    console.log(user, "user");
    if (!user.email.trim()) {
      router.push("/");
    }
  });

  const uploadFile = async (file) => {
    setMedia(file);
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
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors

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
          setMediaUploadStatus(true);
          setMediaPath(downloadURL);
        });
      }
    );
  };

  const setNotification = async (notificationPath) => {
    const upload_data = {
      notificationTime: new Date(),
      message: description,
      title,
      topic: notificationPath,
    };

    if (mediaPath) {
      upload_data.attachments = [mediaPath];
    }

    const docRef = await addDoc(collection(db, "notifications"), upload_data);

    setTitle("");
    setMediaPath("");
    setBranch("all");
    setDescription("");
    setYear("all");
    setDivision("all");
    setBatch("all");
    setMedia("");
    setMediaUploadStatus(false);
    toast.notify(`Submitted response`, { type: "success" });

    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      toast.notify(`Please add title`, { type: "error" });

      return;
    } else if (description.trim().length === 0) {
      toast.notify(`Please add description`, { type: "error" });

      return;
    }

    if (mediaPath.trim().length > 0) {
      //   await uploadFile(mediaPath);
    }

    if (year === "all") {
      setNotification("all");

      return;
    } else if (branch === "all") {
      setNotification(Number(new Date().getFullYear()) + 4 - Number(year));
      toast.notify(`Submitted response`, { type: "success" });

      return;
    } else if (division === "all") {
      setNotification(
        Number(new Date().getFullYear()) + 4 - Number(year) + ("-" + branch)
      );
      toast.notify(`Submitted response`, { type: "success" });

      return;
    } else if (batch === "all" || !batch) {
      setNotification(
        Number(new Date().getFullYear()) +
          4 -
          Number(year) +
          ("-" + branch + "-" + division)
      );
      toast.notify(`Submitted response`, { type: "success" });

      return;
    }

    setNotification(
      Number(new Date().getFullYear()) +
        4 -
        Number(year) +
        ("-" + branch + "-" + division + "-" + batch)
    );

    return;
  };

  return (
    <div className={styles.reminder}>
      <div className={styles.reminderTitle}>Send Notes</div>

      <div className={styles.reminderBody}>
        <div className={styles.reminderBodyLeft}>
          <Element title="Subject *">
            <input
              type="text"
              name="title"
              className={styles.inputText}
              placeholder="Enter subject name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Element>
          <Element title="Description *">
            <textarea
              name="decription"
              cols="30"
              rows="5"
              placeholder="Enter details here"
              className={styles.inputText}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Element>
        </div>
        <div className={styles.reminderBodyRight}>
          <Element title="Add Notes *">
            <div className={styles.inputbox}>
              <input
                type="file"
                onChange={(e) => {
                  uploadFile(e.target.files[0]);
                }}
                id="actual-btn"
                name="attachment"
                hidden
              />
              <label htmlFor="actual-btn" className={styles.label}>
                +
              </label>
              <label>Upload From Device</label>
            </div>
            {uploadMediaStatus && (
              <p style={{ color: "#fff", marginTop: "5px" }}>
                Uploaded {media.name}
              </p>
            )}
          </Element>
          <Element title="Select students *" className="box">
            <div className={styles.box}>
              <div className={styles.inputboxdates}>
                <select
                  onChange={(e) => {
                    setBatch("all");
                    setDivision("all");
                    setBranch("all");
                    setYear(e.target.value);
                  }}
                  value={year}
                >
                  {Object.keys(notificationTopic).map((student_year, index) => (
                    <option key={student_year + index} value={student_year}>
                      {yearClass[student_year]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Year */}
              <div
                className={
                  styles.inputboxdates +
                  (year === "all" ? " " + styles.disabledDropdown : "")
                }
              >
                <select
                  disabled={year === "all"}
                  onChange={(e) => {
                    setBranch(e.target.value);
                    setDivision("all");
                  }}
                  value={branch}
                >
                  {Object.keys(notificationTopic[year]).map(
                    (student_branch, index) => (
                      <option
                        key={student_branch + index}
                        value={student_branch}
                      >
                        {student_branch}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Select Division */}
              <div
                className={
                  styles.inputboxdates +
                  (year === "all" ? " " + styles.disabledDropdown : "")
                }
              >
                <select
                  disabled={year === "all"}
                  onChange={(e) => {
                    setBatch("all");
                    setDivision(e.target.value);
                  }}
                  value={division}
                >
                  {year !== "all"
                    ? Object.keys(notificationTopic[year][branch]).map(
                        (student_division, index) => (
                          <option
                            key={student_division + index}
                            value={student_division}
                          >
                            {student_division}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>

              {/* Select batch */}
              <div
                className={
                  styles.inputboxdates +
                  (year === "all" ? " " + styles.disabledDropdown : "")
                }
              >
                <select
                  disabled={year === "all"}
                  onChange={(e) => setBatch(e.target.value)}
                  value={batch}
                >
                  {year !== "all" && branch !== "all" && division !== "all" ? (
                    notificationTopic[year][branch][division].map(
                      (student_batch, index) => (
                        <option
                          key={student_batch + index}
                          value={student_batch}
                        >
                          {student_batch}
                        </option>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </select>
              </div>
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

export default SendNotes;
