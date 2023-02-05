import React, { useState } from "react";
import styles from "../../styles/Dashboard/Dashboard.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";
import "firebase/storage";
import { getStorage } from "firebase/storage";

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
  const [mediaPath, setMediaPath] = useState("hritik/desktop/profile.jpg");
  const [division, setDivision] = useState(() => {
    if (year == "all" || branch === "all") return "all";

    return selectedBranch[branch][0];
  });

  const uploadFile = async (file) => {
    console.log(file, "uploading file");
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

  const [batch, setBatch] = useState(() => {
    if (year === "all" || branch === "all") return "all";

    return selectedDivision[selectedBranch[branch][0]][0];
  });

  const setNotification = async (notificationPath) => {
    const docRef = await addDoc(collection(db, "notifications"), {
      notificationTime: new Date(),
      message: description,
      title,
      topic: notificationPath,
    });

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

    toast.notify(`Submitted response`, { type: "success" });
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
                  setMediaPath(e.target.value);
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
