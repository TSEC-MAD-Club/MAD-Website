import React, { useState, useEffect } from "react";
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
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import { yearClass } from "../../constants/yearClass";
import { notificationTopic } from "../../constants/notificationTopic";
import { userTypes } from "../../constants/userTypes";
import { teacherDept } from "../../constants/teacherDept";

function Element(props) {
  return (
    <>
      <div className={styles.reminderElementTitle}>{props.title}</div>
      <div className={styles.reminderElementBody}>{props.children}</div>
    </>
  );
}

function CreateReminderComponent() {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("All");
  const [year, setYear] = useState("All");
  const [mediaPath, setMediaPath] = useState("");
  const [media, setMedia] = useState("");
  const [uploadMediaStatus, setMediaUploadStatus] = useState(false);
  const [division, setDivision] = useState("All");
  const [batch, setBatch] = useState("All");
  const [teacher, setTeacher] = useState("All");
  const [senderName, setSenderName] = useState("");
  console.log(user);

  useEffect(() => {
    if (
      !user.type.trim() ||
      !(user.type == userTypes.FACULTY || user.type == userTypes.PRINCIPAL)
    ) {
      router.push("/");
    }
  }, [user]);

  const uploadFile = async (file) => {
    setMedia(file);
    const storage = getStorage();
    const storageRef = ref(storage, "notification/" + file.name);

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
      sentBy: user.name,
      senderName: senderName,
    };
    if (mediaPath) {
      upload_data.attachments = [mediaPath];
    }

    try {
      const docRef = await addDoc(collection(db, "notifications"), upload_data);

      setTitle("");
      setMediaPath("");
      setBranch("All");
      setDescription("");
      setYear("All");
      setDivision("All");
      setBatch("All");
      setMedia("");
      setMediaUploadStatus(false);
      setTeacher("All");
      setSenderName("");
      toast.notify(`Submitted response`, { type: "success" });
      return;
    } catch (error) {
      console.log(error);
      toast.notify(`Submit failed`, { type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preTeacher = "T-";
    if (title.trim().length === 0) {
      toast.notify(`Please add title`, { type: "error" });

      return;
    } else if (
      senderName.trim().length === 0 &&
      user.type == userTypes.FACULTY
    ) {
      toast.notify(`Please add sender name`, { type: "error" });

      return;
    } else if (description.trim().length === 0) {
      toast.notify(`Please add description`, { type: "error" });

      return;
    }

    if (mediaPath.trim().length > 0) {
      // await uploadFile(mediaPath);
    }

    if (user.type == userTypes.PRINCIPAL) {
      setNotification(preTeacher + teacher);
      return;
    }

    if (year === "All") {
      setNotification("All");

      return;
    } else if (branch === "All") {
      setNotification(Number(new Date().getFullYear()) + 4 - Number(year));
      toast.notify(`Submitted response`, { type: "success" });

      return;
    } else if (division === "All") {
      setNotification(
        Number(new Date().getFullYear()) + 4 - Number(year) + ("-" + branch)
      );
      toast.notify(`Submitted response`, { type: "success" });

      return;
    } else if (batch === "All" || !batch) {
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
      <div className={styles.reminderTitle}>New Notification</div>
      <div className={styles.reminderBody}>
        <div className={styles.reminderBodyLeft}>
          {user.type === userTypes.FACULTY && (
            <Element title="Name of sender *">
              <input
                type="text"
                name="senderName"
                className={styles.inputText}
                placeholder="Your name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </Element>
          )}
          <Element title="Title of Notification *">
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
                  // const image_obj = new Image();
                  // image_obj.src = URL.createObjectURL(event.target.files[0]);
                  // image_obj.onload = () => {
                  //   console.log(
                  //     `Image width: ${image_obj.width}, Image height: ${image_obj.height}`
                  //   );
                  // };

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
              <>
                <p style={{ color: "#fff", marginTop: "5px" }}>
                  Uploaded {media.name}
                </p>
              </>
            )}
          </Element>
          {user?.type === userTypes.FACULTY && (
            <Element title="Select students *" className="box">
              <div className={styles.box}>
                <div className={styles.inputboxdates}>
                  <select
                    onChange={(e) => {
                      setBatch("All");
                      setDivision("All");
                      setBranch("All");
                      setYear(e.target.value);
                    }}
                    value={year}
                  >
                    {Object.keys(notificationTopic).map(
                      (student_year, index) => (
                        <option key={student_year + index} value={student_year}>
                          {yearClass[student_year]}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Select Year */}
                <div
                  className={
                    styles.inputboxdates +
                    (year === "All" ? " " + styles.disabledDropdown : "")
                  }
                >
                  <select
                    disabled={year === "All"}
                    onChange={(e) => {
                      setBranch(e.target.value);
                      setDivision("All");
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
                    (year === "All" ? " " + styles.disabledDropdown : "")
                  }
                >
                  <select
                    disabled={year === "All"}
                    onChange={(e) => {
                      setBatch("All");
                      setDivision(e.target.value);
                    }}
                    value={division}
                  >
                    {year !== "All"
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
                    (year === "All" ? " " + styles.disabledDropdown : "")
                  }
                >
                  <select
                    disabled={year === "All"}
                    onChange={(e) => setBatch(e.target.value)}
                    value={batch}
                  >
                    {year !== "All" &&
                    branch !== "All" &&
                    division !== "All" ? (
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
          )}
          {user?.type === userTypes.PRINCIPAL && (
            <Element title="Select teachers *" className="box">
              <div className={styles.box}>
                <div className={styles.inputboxdates}>
                  <select
                    onChange={(e) => {
                      setTeacher(e.target.value);
                    }}
                    value={teacher}
                  >
                    {teacherDept.map((teacher, index) => (
                      <option key={teacher + index} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Element>
          )}
        </div>
      </div>

      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
}

export default CreateReminderComponent;
