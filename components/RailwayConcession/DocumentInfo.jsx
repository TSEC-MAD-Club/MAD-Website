import React from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const DocumentInfo = ({ heading, documentURL, handleCloseInfoWindow }) => {
  return (
    <div className={styles.documentModalDiv}>
      <div className={styles.documentTitleDiv}>
        {documentURL == '#' ? <span className={styles.documentTitle1}>{heading}</span> : <span className={styles.documentTitle}>{heading}</span>}
        <button onClick={handleCloseInfoWindow} className={styles.documentCrossButton}><img src="assets/images/cross.png" alt="cross_button"></img></button>
      </div>
      <div className={styles.documentDiv}>
        {documentURL == '#' ? <span span className={styles.noDocs}>No supporting document to show</span> : <img src={documentURL} className={styles.documentImg}></img>}
      </div>
    </div>
  );
};

export default DocumentInfo;
