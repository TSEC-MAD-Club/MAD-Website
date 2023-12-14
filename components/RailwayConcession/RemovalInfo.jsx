import React, { useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";

const RemovalInfo = ({ request, handleCloseInfoWindow, fetchAllEnquiries }) => {
  const [message, setMessage] = useState("");

  const handleReject = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const detailsQuery = query(
        concessionDetailsCollection,
        where("firstName", "==", request.firstName),
        where("phoneNum", "==", request.phoneNum)
      );
      const detailsSnapshot = await getDocs(detailsQuery);
      const uid = "";

      if (!detailsSnapshot.empty) {
        const matchingDetailsDoc = detailsSnapshot.docs[0];
        const matchingDetailsRef = matchingDetailsDoc.ref;
        uid = matchingDetailsDoc.id;

        await updateDoc(matchingDetailsRef, {
          status: 'rejected',
          statusMessage: message,
        });
      } else {
        return;
      }

      const requestQuery = query(
        collection(db, "ConcessionRequest"),
        where("uid", "==", uid)
      );
      const requestSnapshot = await getDocs(requestQuery);

      if (!requestSnapshot.empty) {
        const matchingRequestDoc = requestSnapshot.docs[0];
        const matchingRequestRef = matchingRequestDoc.ref;

        await updateDoc(matchingRequestRef, {
          status: "rejected",
          statusMessage: message,
        });

        toast.notify("Request rejected", { type: "info" });
        await fetchAllEnquiries();

        handleCloseInfoWindow();
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <div className={styles.modalDiv}>
      <span className={styles.modalRejectTitle}>Reject Concession Request?</span>
      <div className={styles.modalUpperDiv}>
        <div className={styles.studentRejectInfo}>
          <span className={styles.modalInformationTitle}>Name:</span>
          <span className={styles.modalInformation}>{request.firstName} {request.middleName} {request.lastName}</span>
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
          <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
        <div className={styles.modalRejectButtonDiv}>
          <button className={styles.modalRejectButton} onClick={handleReject}>Reject</button>
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
