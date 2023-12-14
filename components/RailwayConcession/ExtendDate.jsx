import React, { useEffect, useState } from "react";
import styles from "../RailwayConcession/RailwayUpdateConcession.module.css";
import { collection, getDocs, query, updateDoc, where, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";

const ExtendDate = ({ request, handleCloseInfoWindow, fetchAllEnquiries }) => {
  const [date, setDate] = useState(new Date());
  const [uid, setUid] = useState('');
  const [passNum, setPassNum] = useState('');
  const firebaseTimestamp = Timestamp.fromDate(date);

  const getPassNum = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const concessionDetailsQuery = query(
        concessionDetailsCollection,
        where("firstName", "==", request.firstName),
        where("phoneNum", "==", request.phoneNum)
      );
      const concessionDetailsSnapshot = await getDocs(concessionDetailsQuery);

      if (concessionDetailsSnapshot.empty) {
        console.error("ConcessionDetails document not found");
        return;
      }

      const matchingConcessionDoc = concessionDetailsSnapshot.docs[0];
      setUid(matchingConcessionDoc.id);

      const concessionRequestCollection = collection(db, "ConcessionRequest");
      const concessionRequestQuery = query(
        concessionRequestCollection,
        where("uid", "==", matchingConcessionDoc.id)
      );

      const concessionRequestSnapshot = await getDocs(concessionRequestQuery);

      if (concessionRequestSnapshot.empty) {
        console.error("ConcessionRequest document not found");
        return;
      }

      const concessionRequestDoc = concessionRequestSnapshot.docs[0];
      const concessionRequestData = concessionRequestDoc.data();
      setPassNum(concessionRequestData.passNum);
    } catch (error) {
      console.error("Error fetching pass number:", error);
    }
  };

  const handleApprove = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const concessionDetailsQuery = query(
        concessionDetailsCollection,
        where("firstName", "==", request.firstName),
        where("phoneNum", "==", request.phoneNum)
      );

      const concessionDetailsSnapshot = await getDocs(concessionDetailsQuery);

      if (concessionDetailsSnapshot.empty) {
        console.error("ConcessionDetails document not found");
        return;
      }

      const matchingConcessionDoc = concessionDetailsSnapshot.docs[0];
      setUid(matchingConcessionDoc.id);

      // Update ConcessionRequest document
      const concessionRequestCollection = collection(db, "ConcessionRequest");
      const concessionRequestQuery = query(
        concessionRequestCollection,
        where("uid", "==", uid)
      );

      const concessionRequestSnapshot = await getDocs(concessionRequestQuery);

      if (concessionRequestSnapshot.empty) {
        console.error("ConcessionRequest document not found");
        return;
      }

      const concessionRequestDoc = concessionRequestSnapshot.docs[0];
      const concessionRequestRef = concessionRequestDoc.ref;

      await updateDoc(concessionRequestRef, { time: date, statusMessage: "Your date has been extended!" });

      // Update ConcessionDetails document
      const concessionDetailsRef = matchingConcessionDoc.ref;
      await updateDoc(concessionDetailsRef, { lastPassIssued: firebaseTimestamp }, { statusMessage: "Your date has been extended!" });

      toast.notify("Extended Request Date", { type: "info" });
      await fetchAllEnquiries();
      handleCloseInfoWindow();
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  useEffect(() => {
    getPassNum();
  }, []);

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
            {request.firstName} {request.middleName} {request.lastName}
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
            value={date.toISOString().split("T")[0]}
            onChange={(e) => {
              setDate(new Date(e.target.value));
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
