import React, { useEffect, useState } from "react";
import styles from "../RailwayConcession/RailwayConcession.module.css";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ref, uploadString, getDownloadURL, getStorage } from 'firebase/storage';
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";

const storage = getStorage();

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

  const uploadCsvToStorage = async (csvContent, fileName) => {
    const storageRef = ref(storage, `csvFiles/${fileName}`);
    await uploadString(storageRef, csvContent, 'raw');
    return getDownloadURL(storageRef);
  };

  //convert alpha numberic to numeric ex, Z123 -> 123
  const alphaToNum = (inputString) => {
    const match = inputString.match(/[a-zA-Z]/);

    if (match) {
      const remainingPart = inputString.substring(1);
      const result = parseInt(remainingPart, 10);
      return result;
    } else {
      return null;
    }
  };

  const handleUpdate = async (passNum) => {
    try {
      const csvCollectionDetails = collection(db, "csvCollection");
      const csvCollectionDetailsSnapshot = await getDocs(csvCollectionDetails);
      const csvData = csvCollectionDetailsSnapshot.docs.map(doc => doc.data());

      if (csvCollectionDetailsSnapshot.empty) {
        console.error("csvCollectionDetails document not found");
        return;
      }
      // console.log(csvData);
      for (let i = 0; i < csvData.length; i++) {
        if (alphaToNum(csvData[i].firstName) <= alphaToNum(passNum) && alphaToNum(csvData[i].lastName) >= alphaToNum(passNum)) {
          updateEntry(csvData[i].content, passNum);
        }
      }
    }
    catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  const updateEntry = async (csvUrl, passNumberToUpdate) => {
    try {
      // Fetch CSV data from the URL
      const response = await fetch(csvUrl);
      const csvData = await response.text();

      // Parse CSV data
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');
      const firstName = rows[1].split(',')[0];
      const lastName = rows[rows.length - 1].split(',')[0];
      const fileName = `${firstName}-${lastName}.csv`;

      // Iterate through rows to find and update the entry
      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const currentPassNumber = values[0].trim();
        if (alphaToNum(currentPassNumber) == alphaToNum(passNumberToUpdate)) {
          // Update the entry
          values[headers.indexOf('name')] = 'Cancelled';

          rows[i] = values.join(',');
          const updatedCsvData = rows.join('\n');

          const csvLink = await uploadCsvToStorage(updatedCsvData, fileName);
          const csvCollection = collection(db, 'csvCollection');
          const csvQuery = query(csvCollection, where('firstName', '==', firstName), where('lastName', '==', lastName));
          const csvSnapshot = await getDocs(csvQuery);

          if (csvSnapshot.empty) {
            console.error('csvCollection document not found');
            return;
          }

          const matchingCsvDoc = csvSnapshot.docs[0];
          const matchingCsvRef = matchingCsvDoc.ref;
          await updateDoc(matchingCsvRef, { content: csvLink });

          break; // Exit the loop once updated
        }
      }
    } catch (error) {
      console.error('Error updating entry:', error);
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

        /* The code `await updateDoc(matchingDetailsRef, { status: 'rejected', statusMessage: message
        })` is updating the document in the "ConcessionDetails" collection with the specified
        `matchingDetailsRef` reference. It sets the `status` field to 'rejected' and the
        `statusMessage` field to the value of the `message` state variable. */
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

        /* The code `await updateDoc(matchingRequestRef, { status: "rejected", statusMessage: message
        })` is updating the document in the "ConcessionRequest" collection with the specified
        `matchingRequestRef` reference. It sets the `status` field to 'rejected' and the
        `statusMessage` field to the value of the `message` state variable. */
        await updateDoc(matchingRequestRef, {
          status: "rejected",
          statusMessage: message,
        });
        handleUpdate(passNum);

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

export default CancelConcession;
