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
    <div className={styles.modalDiv}>
      <span className={styles.modalTitle}>Approve Concession Request?</span>
      <div className={styles.modalUpperDiv}>
        <div className={styles.studentApproveInfo}>
          <span className={styles.modalInformationTitle}>Name:</span>
          <span className={styles.modalInformation}>{request.name}</span>
        </div>
        <div className={styles.modalFromToDiv}>
          <div className={styles.studentApproveInfo}>
            <span className={styles.modalInformationTitle}>From:</span>
            <span className={styles.modalInformation}>
              {request.from}
            </span>
          </div>
          <div className={styles.studentApproveInfo}>
            <span className={styles.modalInformationTitle}>To:</span>
            <span className={styles.modalInformation}>
              {request.to}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.modalLowerDiv}>
        <div className={styles.certificateSection}>
          <span className={styles.modalInformationTitle}>Certificate Number:</span>
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
