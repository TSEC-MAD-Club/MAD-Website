import React from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const RemovalInfo = ({ request, handleCloseInfoWindow }) => {
  return (
    <div className={styles.modalDiv}>
      <span className={styles.modalRejectTitle}>Reject Concession Request?</span>
      <div className={styles.modalUpperDiv}>
        <div className={styles.studentRejectInfo}>
          <span className={styles.modalInformationTitle}>Name:</span>
          <span className={styles.modalInformation}>{request.name}</span>
        </div>
        <div className={styles.modalFromToDiv}>
          <div className={styles.studentRejectInfo}>
            <span className={styles.modalInformationTitle}>From:</span>
            <span className={styles.modalInformation}>{request.from}</span>
          </div>
          <div className={styles.studentRejectInfo}>
            <span className={styles.modalInformationTitle}>To:</span>
            <span className={styles.modalInformation}>{request.to}</span>
          </div>
        </div>
      </div>
      <div className={styles.modalRejectMessageDiv}>
        <div className={styles.messageSection}>
          <span className={styles.modalInformationTitle}>Message:</span>
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
