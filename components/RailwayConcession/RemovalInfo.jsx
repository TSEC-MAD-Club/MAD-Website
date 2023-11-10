import React from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const RemovalInfo = ({ request, handleCloseInfoWindow }) => {
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
      <span style={{fontSize: "1.7rem"}}>Reject Concession Request?</span>
      <div style={{ display: "flex" }}>
        <div className={styles.studentRejectInfo}>
          <span className={styles.modalInformation}>Name:</span>
          <span className={styles.modalInformation} style={{ fontWeight: "600" }}>{request.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
          <div className={styles.studentRejectInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>From:</span>
            <span className={styles.modalInformation} style={{ fontWeight: "600" }}>{request.from}</span>
          </div>
          <div className={styles.studentRejectInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>To:</span>
            <span className={styles.modalInformation} style={{ fontWeight: "600" }}>{request.to}</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.certificateSection} style={{ width: "100%" }}>
          <span className={styles.modalInformation}>Message:</span>
          <textarea></textarea>
        </div>
        <div className={styles.modalRejectButtonDiv}>
          <button className={styles.modalRejectButton}>Reject</button>
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

export default RemovalInfo;
