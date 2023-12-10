// ApprovalInfo.js
import React, { useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ApprovalInfo = ({ request, handleCloseInfoWindow }) => {
  const [certificateNumber, setCertificateNumber] = useState("");

  const fetchConcessionDetails = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const q = query(
        concessionDetailsCollection,
        where("name", "==", request.name),
        where("DOB", "==", request.DOB)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        console.log("Matching ConcessionDetails:", matchingDoc.data());
      } else {
        console.error("ConcessionDetails document not found");
      }
    } catch (error) {
      console.error("Error fetching ConcessionDetails:", error);
    }
  };

  const handleApprove = async () => {
    try {
      const docRef = doc(db, "ConcessionRequest", uid);
      await updateDoc(docRef, { status: "Serviced", passNum: certificateNumber, statusMessage: "Your request has been approved!" });
      handleCloseInfoWindow();
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  // useEffect(() => {
  //   fetchConcessionDetails();
  // }, [request.name, request.DOB]);

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
      <span className={styles.modalTitle}>Approve Concession Request?</span>
      <div style={{ display: "flex" }}>
        <div className={styles.studentApproveInfo}>
          <span className={styles.modalInformation}>Name:</span>
          <span className={styles.modalInformation} style={{ fontWeight: "600" }}>{request.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
          <div className={styles.studentApproveInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>From:</span>
            <span className={styles.modalInformation} style={{ fontWeight: "600" }}>
              {request.from}
            </span>
          </div>
          <div className={styles.studentApproveInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>To:</span>
            <span className={styles.modalInformation} style={{ fontWeight: "600" }}>
              {request.to}
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.certificateSection} style={{ width: "60%" }}>
          <span className={styles.modalInformation}>Certificate Number:</span>
          <input onChange={(e) => setCertificateNumber(e.target.value)}></input>
        </div>
        <div className={styles.modalButtonDiv}>
          <button className={styles.modalApproveButton} onClick={handleApprove}>Approve</button>
          <button className={styles.modalGoBackButton} onClick={handleCloseInfoWindow}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalInfo;
