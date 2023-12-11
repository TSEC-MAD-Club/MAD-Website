import React, { useEffect, useState } from "react";
import styles from "./RailwayUpdateConcession.module.css";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase.js";

const RailwayUpdateConcessionCard = ({ request }) => {
  const [uid, setUid] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const convertDate = (date) => {
    const dobTimestamp = date;
    const dobMilliseconds = dobTimestamp.seconds * 1000 + dobTimestamp.nanoseconds / 1e6;
    const dobDate = new Date(dobMilliseconds);
    const dateObj = new Date(dobDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchConcessionDetails = async () => {
    try {
      const concessionDetailsCollection = collection(db, 'ConcessionDetails');
      const q = query(
        concessionDetailsCollection,
        where('name', '==', request.name),
        where('phoneNum', '==', request.phoneNum)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const matchingDoc = querySnapshot.docs[0];
        setUid(matchingDoc.id);
      } else {
        console.error('ConcessionDetails document not found');
      }
    } catch (error) {
      console.error('Error fetching ConcessionDetails:', error);
    }
  };

  const fetchConcessionRequest = async () => {
    try {
      await fetchConcessionDetails();
      const concessionRequestRef = collection(db, 'ConcessionRequest');
      const q = query(concessionRequestRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const concessionRequest = querySnapshot.docs[0].data();
        setStatusMessage(concessionRequest.statusMessage);
      } else {
        console.error('No matching ConcessionRequest document found');
      }
    } catch (error) {
      console.error('Error fetching ConcessionRequest:', error);
    }
  };

  useEffect(() => {
    fetchConcessionRequest();
  }, [request]);

  return (
    <div className={styles.railwayConcessionCard}>
      <div className={styles.railwayConcessionTitle}>
        <p className={styles.nameAndGender}>
          <span className={styles.name}>{request.name}</span>
          <span className={styles.gender}>{request.gender}</span>
          <span className={styles.western}>{request.travelLane}</span>
        </p>
      </div>
      <hr className={styles.railwayConcessionCardHr} />
      <table className={styles.railwayConcessionCardTable}>
        <tbody>
          <tr>
            <td className={styles.railwayConcessionCardTableCell}>From:</td>
            <td className={styles.railwayConcessionCardTableCell}>To:</td>
            <td className={styles.railwayConcessionCardTableCell}>Class:</td>
            <td className={styles.railwayConcessionCardTableCell}>Mode:</td>
            <td className={styles.railwayConcessionCardTableCell}>
              Date of Issue:
            </td>
            <td className={styles.railwayConcessionCardTableCell}>Branch:</td>
            <td className={styles.railwayConcessionCardTableCell}>Current Year:</td>
          </tr>

          <tr>
            <td className={styles.railwayConcessionCardTableCell2}>
              {request.from} <hr className={styles.horizontalLine} />
            </td>
            <td className={styles.railwayConcessionCardTableCell2}>
              {request.to}
            </td>
            <td className={styles.railwayConcessionCardTableCell2}>
              {request.class}
            </td>
            <td className={styles.railwayConcessionCardTableCell2}>
              {request.duration}
            </td>
            <td className={styles.railwayConcessionCardTableCell2}>
              {convertDate(request.lastPastIssued)}
            </td>
            <td className={styles.railwayConcessionCardTableCell2}>
              {request.branch}
            </td>
            <td className={styles.railwayConcessionCardTableCell2}>
              {request.gradYear}
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.railwayConcessionCardInfo}>
        <div className={styles.railwayAdress}>
          <p className={styles.railwayConcessionCardTableCell}>Address:</p>
          <p className={styles.railwayConcessionCardAddress}>
            {request.address}
          </p>
        </div>

        <div className={styles.railwayDOB}>
          <p className={styles.railwayConcessionCardTableCell}>
            Date of Birth:
          </p>
          <p className={styles.railwayConcessionCardAddress}>
            {convertDate(request.dob)}
          </p>
        </div>

        <div className={styles.railwayAge}>
          <p className={styles.railwayConcessionCardTableCell}>Age:</p>
          <p className={styles.railwayConcessionCardAddress}>
            {request.ageYears} Years & {request.ageMonths} Months
          </p>
        </div>

        <div className={styles.railwayPhoneNumber}>
          <p className={styles.railwayConcessionCardTableCell}>Phone Number:</p>
          <p className={styles.railwayConcessionCardAddress}>
            {request.phoneNum}
          </p>
        </div>
      </div>
      <hr className={styles.railwayConcessionCardHr} />
      <div className={styles.railwayConcessionCardFooter}>
        <div className={styles.Doc}>
          <p className={styles.railwayConcessionCardTableCell}>Documents:</p>
          <ul className={styles.railwayConcessionCardDocumentsList}>
            <li><a href={request.idCardURL}>ID Card</a></li>
            <li><a href={request.previousPassURL}>Previous Pass</a></li>
            <li><a href="#">Additional documents</a></li>
          </ul>
        </div>
        <p className={styles.railwayConcessionCardTableCell}>
          Message:
          <ul className={styles.railwayConcessionCardDocumentsList}>
            <li>{statusMessage}</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default RailwayUpdateConcessionCard;
