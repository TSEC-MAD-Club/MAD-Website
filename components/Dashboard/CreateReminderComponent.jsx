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

const selectedBranch = {
  Comps: ["all", "C1", "C2", "C3"],
  It: ["all", "I1", "I2", "I3"],
  Mech: ["all", "M1", "M2", "M3"],
  Aids: ["all", "A1"],
  Chem: ["all", "Ch1"],
  all: ["all"],
};

const selectedDivision = {
  C1: ["all", "c11", "c12", "c13"],
  C2: ["all", "c21", "c22", "c23"],
  C3: ["all", "c31", "c32", "c33"],
  I1: ["all", "i11", "i12", "i13"],
  I2: ["all", "i21", "i22", "i23"],
  I3: ["all", "i31", "i32", "i33"],
  M1: ["all", "m11", "m12", "m13"],
  M2: ["all", "m21", "m22", "m23"],
  M3: ["all", "m31", "m32", "m33"],
  A1: ["all"],
  Ch1: ["all"],
  all: [],
};

function Element(props) {
  return (
    <>
      <div className={styles.reminderElementTitle}>{props.title}</div>
      <div className={styles.reminderElementBody}>{props.children}</div>
    </>
  );
}

function CreateReminderComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("all");
  const [year, setYear] = useState("all");
  const [mediaPath, setMediaPath] = useState("");
  const [media, setMedia] = useState("");
  const [uploadMediaStatus, setMediaUploadStatus] = useState(false);
  const [division, setDivision] = useState(() => {
    if (year == "all" || branch === "all") return "all";

    return selectedBranch[branch][0];
  });
  const [batch, setBatch] = useState(() => {
    if (year === "all" || branch === "all") return "all";

    return selectedDivision[selectedBranch[branch][0]][0];
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
    const docRef = await addDoc(collection(db, "notifications"), {
      notificationTime: new Date(),
      message: description,
      title,
      topic: notificationPath,
      attachment: mediaPath,
    });

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

  React.useEffect(() => {
    if (year == "all" || branch === "all") {
      setDivision("all");
      setBatch("all");

      return;
    }

    setDivision(selectedBranch[branch][0]);
    let _division = selectedBranch[branch][0];
    setBatch(selectedDivision[_division][0]);
  }, [branch]);

  React.useEffect(() => {
    if (year == "all" || branch === "all") setBatch("all");

    setBatch(selectedDivision[selectedBranch[branch][0]][0]);
  }, [division]);

  return (
    <div className={styles.reminder}>
      <div className={styles.reminderTitle}>New Reminder</div>

      <div className={styles.reminderBody}>
        <div className={styles.reminderBodyLeft}>
          <Element title="Title of Reminder *">
            <input
              type="text"
              name="title"
              className={styles.inputText}
              placeholder="Enter a task here"
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
          <Element title="Add attachments (Optional)">
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
                <select onChange={(e) => setYear(e.target.value)} value={year}>
                  <option value="all">All year</option>
                  <option value={1}>First year</option>
                  <option value={2}>Second year</option>
                  <option value={3}>Third year</option>
                  <option value={4}>Fourth year</option>
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
                    setBatch(selectedDivision[selectedBranch[branch][0]][0]);
                  }}
                  value={branch}
                >
                  <option key={"all"} value={"all"}>
                    All{" "}
                  </option>
                  <option key={"Comps"} value={"Comps"}>
                    Comps
                  </option>
                  <option key={"It"} value="It">
                    IT
                  </option>
                  <option key={"Aids"} value="Aids">
                    Aids
                  </option>
                  <option key={"Chem"} value={"Chem"}>
                    Chem
                  </option>
                  <option key={"Mech"} value={"Mech"}>
                    Mech
                  </option>
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
                    setDivision(e.target.value);
                    setBatch(selectedDivision[e.target.value][0]);
                  }}
                  value={division}
                >
                  {selectedBranch[branch].map((_div) => (
                    <option key={_div} value={_div}>
                      {_div}
                    </option>
                  ))}
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
                  {selectedDivision[division].map((_batch) => (
                    <option key={_batch} value={_batch}>
                      {_batch}
                    </option>
                  ))}
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

export default CreateReminderComponent;
