import React, { useEffect, useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const DocumentInfo = ({ heading, documentURL, handleCloseInfoWindow, fetchAllEnquiries }) => {
  return (
    <div className={styles.documentModalDiv}>
        <div className={styles.documentTitleDiv}>
            <span className={styles.documentTitle}>{heading}</span>
            <button onClick={handleCloseInfoWindow} className={styles.documentCrossButton}><img src="assets/images/cross.png" alt="cross_button"></img></button>
        </div>
        <div className={styles.documentDiv}>
            <img src={documentURL} className={styles.documentImg}></img>
        </div>
    </div>
  );
};

export default DocumentInfo;
