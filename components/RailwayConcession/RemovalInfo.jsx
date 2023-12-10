import React from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";

const RemovalInfo = ({ request, handleCloseInfoWindow }) => {
  const [message, setMessage] = useState("");
  var uid = "";
  console.log(message);
  const fetchConcessionDetails = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const q = query(
        concessionDetailsCollection,
        where("name", "==", request.name),
        where("phoneNum", "==", request.phoneNum)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        uid = matchingDoc.id;
      } else {
        console.error("ConcessionDetails document not found");
      }
    } catch (error) {
      console.error("Error fetching ConcessionDetails:", error);
    }
  };

  const handleReject = async () => {
    try {
      fetchConcessionDetails()
      const q = query(
        collection(db, "ConcessionRequest"),
        where("uid", "==", uid)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        const docRef = matchingDoc.ref;
        await updateDoc(docRef, { status: "Serviced", passNum: certificateNumber, statusMessage: "Your request has been approved!" });
        handleCloseInfoWindow();
      } else {
        console.error("ConcessionRequest document not found");
      }
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

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
