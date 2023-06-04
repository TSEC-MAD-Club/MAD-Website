import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { db, app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import style from "../styles/Login.module.css";
import { toast } from "react-nextjs-toast";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { UserContext } from "./_app";
import { userTypes } from "../constants/userTypes";

// import { getStorage } from "firebase/";

export default function Admin() {
  const { user } = React.useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pendingEvents, setPendingEvents] = useState([]);
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  useEffect(() => {
    getAllPendingEvents();
  }, []);

  useEffect(() => {
    if (!user.type.trim() || user.type != userTypes.ADMIN) {
      router.push("/");
    }
  }, [user]);

  const getAllPendingEvents = async () => {
    const pendingEvents = [];
    try {
      const tempEventsRef = collection(db, "TempEvents");
      const querySnapshot = await getDocs(tempEventsRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        pendingEvents.push({ ...data, id: doc.id });
      });
    } catch (error) {
      console.log(error);
    }

    setPendingEvents(pendingEvents);
  };

  // Event handler for when a checkbox is clicked
  const handleCheckboxChange = (event) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    // Update the state array of checked checkbox IDs
    if (isChecked) {
      const temp = checkedBoxes.filter((id) => id);
      setCheckedBoxes([...temp, checkboxId]);
    } else {
      const temp = checkedBoxes.filter((id) => id !== checkboxId);
      setCheckedBoxes([...temp]);
    }
  };

  const handleApproveFn = async () => {
    // remove the document from collection "TempEvents" and add it to "Events"
    let newPendingEvents = [];
    try {
      pendingEvents.map(async (events) => {
        let data = {};
        for (let key in events) {
          if (key !== "id") {
            data[key] = events[key];
          }
        }
        if (checkedBoxes.includes(events.id)) {
          let docRef = doc(db, "TempEvents", events.id);
          await deleteDoc(docRef);

          docRef = await addDoc(collection(db, "Events"), data);
        } else {
          newPendingEvents.push(data);
        }
      });
      if (newPendingEvents.length !== pendingEvents.length) {
        toast.notify(`Successfully Approved!`, { type: "success" });
        setPendingEvents(newPendingEvents);
      } else {
        toast.notify(`No Events Selected!`, { type: "error" });
      }
    } catch (error) {
      toast.notify(`Approved failed: ${error}`, { type: "error" });
    }
  };

  const handleDeleteFn = async () => {
    // remove the document from collection "TempEvents" and add it to "Events"
    let newPendingEvents = [];
    try {
      pendingEvents.map(async (events) => {
        if (checkedBoxes.includes(events.id)) {
          let docRef = doc(db, "TempEvents", events.id);
          await deleteDoc(docRef);
        } else {
          newPendingEvents.push(events);
        }
      });
      if (newPendingEvents.length !== pendingEvents.length) {
        toast.notify(`Successfully Deleted!`, { type: "success" });
        setPendingEvents(newPendingEvents);
      } else {
        toast.notify(`No Events Selected!`, { type: "error" });
      }
    } catch (error) {
      toast.notify(`Delete failed: ${error}`, { type: "error" });
    }
  };

  // Render the list of checkboxes using the "checkboxes" array
  const renderedCheckboxes = pendingEvents.map((checkbox) => (
    <label key={checkbox.id} className="checkBoxContainer">
      <input type="checkbox" id={checkbox.id} onChange={handleCheckboxChange} />
      <div>
        <p>Committee Name: {checkbox["Committee Name"]}</p>
        <p>Event Name: {checkbox["Event Name"]}</p>
        <p>Document ID: {checkbox["id"]}</p>
      </div>
    </label>
  ));

  return (
    <>
      <div className={style.signInUpBody}>
        <p style={{ color: "#fff", fontSize: "24px" }}>Pending events</p>
        {renderedCheckboxes}
        {pendingEvents.length ? (
          <>
            <button onClick={handleApproveFn}>Approve events</button>
            <button onClick={handleDeleteFn}>Delete events</button>
          </>
        ) : (
          <p>No Pending Events found</p>
        )}
      </div>
    </>
  );
}
