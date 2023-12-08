// ApprovalInfo.js
import React, { useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const ApprovalInfo = ({ request, handleCloseInfoWindow }) => {
  const [certificateNumber, setCertificateNumber] = useState("");

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
          <button className={styles.modalApproveButton}>Approve</button>
          <button className={styles.modalGoBackButton} onClick={handleCloseInfoWindow}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalInfo;
