import React, { useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";


const CancelConcession = ({ request, handleCloseInfoWindow }) => {
  const [message, setMessage] = useState("");

  var uid = "";

  const fetchConcessionDetails = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const q = query(
        concessionDetailsCollection,
        where("name", "==", request.name),
        where("phoneNum", "==", request.phoneNum)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        uid = matchingDoc.id;
      } else {
        console.error("ConcessionDetails document not found");
      }
    } catch (error) {
      console.error("Error fetching ConcessionDetails:", error);
    }
  };

  const handleReject = async () => {
    try {
      fetchConcessionDetails()
      const q = query(
        collection(db, "ConcessionRequest"),
        where("uid", "==", uid)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        const docRef = matchingDoc.ref;
        await updateDoc(docRef, { status: "Rejected", statusMessage: message });
        handleCloseInfoWindow();
      } else {
        console.error("ConcessionRequest document not found");
      }
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--primary-5)",
        padding: "20px 30px",
        borderRadius: "24px",
        fontSize: "14px",
        color: "var(--primary-2)",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "1.7rem" }}>Reject Concession Request?</span>
      <div style={{ display: "flex" }}>
        <div className={styles.studentRejectInfo}>
          <span className={styles.modalInformation}>Name:</span>
          <span
            className={styles.modalInformation}
            style={{ fontWeight: "600" }}
          >
            {request.name}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
          <div className={styles.studentApproveInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>Certificate Number:</span>
            <span
              className={styles.modalInformation}
              style={{ fontWeight: "600" }}
            >
              {request.certificateNumber}
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.certificateSection} style={{ width: "100%" }}>
          <span className={styles.modalInformation}>Message:</span>
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
        </div>
        <div className={styles.modalRejectButtonDiv}>
          <button className={styles.modalRejectButton} onClick={handleReject}>Cancel</button>
          <button
            className={styles.modalGoBackButton}
            onClick={handleCloseInfoWindow}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConcession;
