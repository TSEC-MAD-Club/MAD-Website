// ApprovalInfo.js
import React, { useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const ApprovalInfo = ({ request, handleCloseInfoWindow }) => {
  const [certificateNumber, setCertificateNumber] = useState("");

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
          <button className={styles.modalApproveButton}>Approve</button>
          <button className={styles.modalGoBackButton} onClick={handleCloseInfoWindow}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalInfo;
