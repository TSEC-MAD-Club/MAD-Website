import React, { useEffect, useState } from "react";
import styles from "../RailwayConcession/RailwayUpdateConcession.module.css";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

const ExtendDate = ({ request, handleCloseInfoWindow }) => {
  const [date, setDate] = useState(new Date());
  var uid = "";
  var passNum = "";

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
        passNum = matchingDoc.data().passNum;
        uid = matchingDoc.id;
      } else {
        console.error("ConcessionDetails document not found");
      }
    } catch (error) {
      console.error("Error fetching ConcessionDetails:", error);
    }
  };

  const handleApprove = async () => {
    fetchConcessionDetails();
    try {
      // Update ConcessionRequest document
      const requestQ = query(
        collection(db, "ConcessionRequest"),
        where("uid", "==", uid)
      );

      const requestQuerySnapshot = await getDocs(requestQ);

      if (!requestQuerySnapshot.empty) {
        const requestDoc = requestQuerySnapshot.docs[0];
        const requestDocRef = requestDoc.ref;
        await updateDoc(requestDocRef, { time: date, statusMessage: "Your date has been extended!" });
      } else {
        console.error("ConcessionRequest document not found");
        return;
      }

      // Update ConcessionDetails document using the document ID directly
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const q = query(
        concessionDetailsCollection,
        where("name", "==", request.name),
        where("phoneNum", "==", request.phoneNum)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const detailsDoc = querySnapshot.docs[0];
        const detailsDocRef = detailsDoc.ref;

        await updateDoc(detailsDocRef, { lastPassIssued: date });
        console.log("ConcessionDetails document updated successfully");
      } else {
        console.error("No matching ConcessionDetails document found");
      }

      handleCloseInfoWindow();
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--primary-5)",
        padding: "20px 30px",
        borderRadius: "16px",
        fontSize: "14px",
        color: "var(--primary-2)",
      }}
    >
      <span className={styles.modalTitle}>Extend Date</span>
      <div style={{ display: "flex" }}>
        <div className={styles.studentApproveInfo}>
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
              {passNum}
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.certificateSection} style={{ width: "60%" }}>
          <span className={styles.modalInformation}>Extend Date to:</span>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.modalButtonDiv}>
          <button className={styles.modalApproveButton} onClick={handleApprove}>Extend Date</button>
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

export default ExtendDate;
