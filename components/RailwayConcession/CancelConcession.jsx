import React, { useEffect, useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";

const CancelConcession = ({ request, handleCloseInfoWindow, fetchAllEnquiries }) => {
  const [message, setMessage] = useState("");
  const [passNum, setPassNum] = useState("");
  const [uid, setUid] = useState('');

  const getPassNum = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const concessionDetailsQuery = query(
        concessionDetailsCollection,
        where("firstName", "==", request.firstName),
        where("phoneNum", "==", request.phoneNum)
      );
      const concessionDetailsSnapshot = await getDocs(concessionDetailsQuery);

      if (concessionDetailsSnapshot.empty) {
        console.error("ConcessionDetails document not found");
        return;
      }

      const matchingConcessionDoc = concessionDetailsSnapshot.docs[0];
      setUid(matchingConcessionDoc.id);

      const concessionRequestCollection = collection(db, "ConcessionRequest");
      const concessionRequestQuery = query(
        concessionRequestCollection,
        where("uid", "==", matchingConcessionDoc.id)
      );

      const concessionRequestSnapshot = await getDocs(concessionRequestQuery);

      if (concessionRequestSnapshot.empty) {
        console.error("ConcessionRequest document not found");
        return;
      }

      const concessionRequestDoc = concessionRequestSnapshot.docs[0];
      const concessionRequestData = concessionRequestDoc.data();
      setPassNum(concessionRequestData.passNum);
    } catch (error) {
      console.error("Error fetching pass number:", error);
    }
  };

  const fetchConcessionDetails = async () => {
    try {
      const concessionDetailsCollection = collection(db, "ConcessionDetails");
      const q = query(
        concessionDetailsCollection,
        where("firstName", "==", request.firstName),
        where("phoneNum", "==", request.phoneNum)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        setUid(matchingDoc.id);
      } else {
        console.error("ConcessionDetails document not found");
      }
    } catch (error) {
      console.error("Error fetching ConcessionDetails:", error);
    }
  };

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
        console.error("ConcessionDetails document not found");
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
        console.error("ConcessionRequest document not found");
      }
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  useEffect(() => {
    getPassNum();
  }, []);

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
      <span style={{ fontSize: "1.7rem" }}>Reject Concession Request?</span>
      <div style={{ display: "flex" }}>
        <div className={styles.studentRejectInfo}>
          <span className={styles.modalInformation}>Name:</span>
          <span
            className={styles.modalInformation}
            style={{ fontWeight: "600" }}
          >
            {request.firstName} {request.middleName} {request.lastName}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
          <div className={styles.studentApproveInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>Certificate Number:</span>
            <span
              className={styles.modalInformation}
              style={{ fontWeight: "600" }}
            >
              {passNum}
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.certificateSection} style={{ width: "100%" }}>
          <span className={styles.modalInformation}>Message:</span>
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
        </div>
        <div className={styles.modalRejectButtonDiv}>
          <button className={styles.modalRejectButton} onClick={handleReject}>Cancel</button>
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

export default CancelConcession;
