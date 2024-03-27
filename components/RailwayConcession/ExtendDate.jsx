import React, { useEffect, useState } from "react";
import styles from "../RailwayConcession/RailwayUpdateConcession.module.css";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db } from "../../firebase";
import { toast } from "react-nextjs-toast";
import Spinner from "../Spinner";

const storage = getStorage();

const ExtendDate = ({ request, handleCloseInfoWindow, fetchAllEnquiries }) => {
  const [date, setDate] = useState(new Date());
  const [uid, setUid] = useState("");
  const [passNum, setPassNum] = useState("");
  const [duration, setDuration] = useState(request.duration);
  const firebaseTimestamp = Timestamp.fromDate(date);

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
    await uploadString(storageRef, csvContent, "raw");
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

  const handleUpdate = async (passNum, date) => {
    try {
      const csvCollectionDetails = collection(db, "csvCollection");
      const csvCollectionDetailsSnapshot = await getDocs(csvCollectionDetails);
      const csvData = csvCollectionDetailsSnapshot.docs.map((doc) =>
        doc.data()
      );

      if (csvCollectionDetailsSnapshot.empty) {
        console.error("csvCollectionDetails document not found");
        return;
      }
      // console.log(csvData);
      for (let i = 0; i < csvData.length; i++) {
        if (
          alphaToNum(csvData[i].firstName) <= alphaToNum(passNum) &&
          alphaToNum(csvData[i].lastName) >= alphaToNum(passNum)
        ) {
          updateEntry(csvData[i].content, passNum, date);
        }
      }
    } catch (error) {
      console.error("Error updating status and message:", error);
    }
  };

  const updateEntry = async (csvUrl, passNumberToUpdate, newDate) => {
    try {
      // Fetch CSV data from the URL
      const response = await fetch(csvUrl);
      const csvData = await response.text();

      //date
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      // Parse CSV data
      const rows = csvData.split("\n");
      const headers = rows[0].split(",");
      const firstName = rows[1].split(",")[0];
      const lastName = rows[rows.length - 1].split(",")[0];
      const fileName = `${firstName}-${lastName}.csv`;

      // Iterate through rows to find and update the entry
      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(",");
        const currentPassNumber = values[0].trim();
        if (alphaToNum(currentPassNumber) == alphaToNum(passNumberToUpdate)) {
          // Update the entry
          values[headers.indexOf("lastPassIssued")] = `${day}/${month}/${year}`;

          rows[i] = values.join(",");
          const updatedCsvData = rows.join("\n");

          const csvLink = await uploadCsvToStorage(updatedCsvData, fileName);
          const csvCollection = collection(db, "csvCollection");
          const csvQuery = query(
            csvCollection,
            where("firstName", "==", firstName),
            where("lastName", "==", lastName)
          );
          const csvSnapshot = await getDocs(csvQuery);

          if (csvSnapshot.empty) {
            console.error("csvCollection document not found");
            return;
          }

          const matchingCsvDoc = csvSnapshot.docs[0];
          const matchingCsvRef = matchingCsvDoc.ref;
          await updateDoc(matchingCsvRef, { content: csvLink });

          break; // Exit the loop once updated
        }
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };
  const [loading, setLoading] = useState(false);
  const handleApprove = async () => {
    // setLoading(true);
    try {
      setLoading(true);
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

      // Update ConcessionRequest document
      const concessionRequestCollection = collection(db, "ConcessionRequest");
      const concessionRequestQuery = query(
        concessionRequestCollection,
        where("uid", "==", uid)
      );

      const concessionRequestSnapshot = await getDocs(concessionRequestQuery);

      if (concessionRequestSnapshot.empty) {
        console.error("ConcessionRequest document not found");
        return;
      }

      const concessionRequestDoc = concessionRequestSnapshot.docs[0];
      const concessionRequestRef = concessionRequestDoc.ref;

      /* The line `await updateDoc(concessionRequestRef, { time: date, statusMessage: "Your date has
      been extended!" });` is updating the `ConcessionRequest` document in the Firebase Firestore
      database. It sets the `time` field to the value of the `date` variable and sets the
      `statusMessage` field to the string "Your date has been extended!". */
      await updateDoc(concessionRequestRef, {
        time: date,
        statusMessage: "Your date has been extended!",
      });

      // Update ConcessionDetails document
      const concessionDetailsRef = matchingConcessionDoc.ref;
      /* The line `await updateDoc(concessionDetailsRef, { lastPassIssued: firebaseTimestamp }, {
      statusMessage: "Your date has been extended!" });` is updating the `ConcessionDetails`
      document in the Firebase Firestore database. */
      await updateDoc(
        concessionDetailsRef,
        { lastPassIssued: firebaseTimestamp },
        { statusMessage: "Your date has been extended!" }
      );

      await updateDoc(
        concessionDetailsRef,
        { duration },
        { statusMessage: "Your mode has been updated!" }
      )

      handleUpdate(passNum, date);
      toast.notify("Extended Request Date", { type: "info" });
      await fetchAllEnquiries();
      setLoading(false);
      handleCloseInfoWindow();
    } catch (error) {
      console.error("Error updating status and message:", error);
      setLoading(false);
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
        borderRadius: "16px",
        fontSize: "14px",
        color: "var(--primary-2)",
      }}
    >
      {loading && <Spinner />}
      <span className={styles.modalTitle}>Extend Date</span>
      <div style={{ display: "flex" }}>
        <div className={styles.studentApproveInfo}>
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
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <div className={styles.studentApproveInfo} style={{ width: "100%" }}>
            <span className={styles.modalInformation}>Change Mode:</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={styles.modeDropdown}
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.certificateSection} style={{ width: "60%" }}>
          <span className={styles.modalInformation}>Extend Date to:</span>
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => {
              setDate(new Date(e.target.value));
            }}
          ></input>
        </div>
        <div className={styles.modalButtonDiv}>
          <button className={styles.modalApproveButton} onClick={handleApprove}>
            Extend Date
          </button>
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

export default ExtendDate;
