import React, { useEffect, useState } from "react";
import styles from "../styles/CreateNote.module.css"
import SideBar from "../components/Sidebar/Sidebar";
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
import { UserContext } from "./_app";
import { notificationTopic } from "../constants/notificationTopic";
import { yearClass } from "../constants/yearClass";
import { userTypes } from "../constants/userTypes";

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [branch, setBranch] = useState("All");
    const [year, setYear] = useState("All");
    const [mediaPath, setMediaPath] = useState("");
    const [media, setMedia] = useState("");
    const [uploadMediaStatus, setMediaUploadStatus] = useState(false);
    const [division, setDivision] = useState("All");
    const [batch, setBatch] = useState("All");
    const router = useRouter();
    const { user } = React.useContext(UserContext);
    useEffect(() => {
        if (!user.email.trim() || user.type != userTypes.FACULTY) {
            router.push("/");
        }
    }, [user]);

    const uploadFile = async (file) => {
        setMedia(file);
        const storage = getStorage();
        const storageRef = ref(storage, "notes/" + file.name);

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
                        toast.notify(`storage unauthorized`, { type: "error" });
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        toast.notify(`storage canceled`, { type: "error" });
                        break;

                    // ...

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        toast.notify(`storage unknown`, { type: "error" });
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
            toast.notify(`Submitted response`, { type: "success" });
        } catch (error) {
            toast.notify(`Submitted failed`, { type: "error" });
        }

        return;
    };

    return (
        <div style={{ background: "var(--dark-bg)" }}>
            <div className={styles.pageWrapper}>
                <SideBar user={user} />
                <div className={styles.noteWrapper}>
                    <h1 className={styles.mainHeading}>Create a Note</h1>
                    <h5 className={styles.subTitle}>Create a Note about something for the students</h5>
                    <div className={styles.createNoteWrapper}>
                        <div className={styles.gridBox}>
                            <div className={styles.subjectDiv}>
                                <label>Subject*</label>
                                <input
                                    placeholder="Enter the subject here"
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={styles.subjectText}
                                />
                            </div>
                        </div>
                        <div className={styles.gridBox}>
                            <label>Select Students</label>
                            <div style={{ display: "flex" }}>
                                <select
                                    onChange={(e) => {
                                        setBatch("All");
                                        setDivision("All");
                                        setBranch("All");
                                        setYear(e.target.value);
                                    }}
                                    value={year} className={styles.subjectText}>
                                    {Object.keys(notificationTopic).map((student_year, index) => (
                                        <option key={student_year + index} value={student_year}>
                                            {yearClass[student_year]}
                                        </option>
                                    ))}
                                </select>
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
                                        className={styles.subjectText}
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
                                        className={styles.subjectText}
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
                                        className={styles.subjectText}
                                    >
                                        {year !== "All" && branch !== "All" && division !== "All" ? (
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
                        </div>
                        <div className={styles.gridBox}>
                            <div className={styles.descriptionDiv}>
                                <label>Description*</label>
                                <textarea
                                    name="decription"
                                    placeholder="Enter the details here"
                                    className={styles.descriptionBox}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                        <div className={styles.gridBox}>
                            <div className={styles.addNotesDiv}>
                                <label className={styles.label} style={{ marginBottom: '1rem' }}>
                                    Add Notes*
                                </label>
                                <div className={styles.addNotesContainer}>
                                    <label htmlFor="file-upload">
                                        <div className={styles.uploadContainer}>
                                            <img className={styles.uploadIcon} src="assets/images/uploadIcon.png" alt="" />
                                            <div className={styles.uploadText}>Drag and drop files or
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    onChange={(e) => {
                                                        uploadFile(e.target.files[0]);
                                                    }}
                                                    name="attachment"
                                                    hidden
                                                    style={{ display: 'none' }} />
                                                <span className={styles.browseText}> Browse</span></div>
                                            <div className={styles.uploadTextInstruction}>
                                                Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                                            </div>
                                        </div>
                                        {uploadMediaStatus && (
                                            <p style={{ color: "#fff", marginTop: "5px" }}>
                                                Uploaded {media.name}
                                            </p>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sendNoteButtonContainer}>
                        <button type="submit" onClick={handleSubmit} className={styles.sendNoteButton}>
                            Send Note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote;