import React, { useState } from "react";
import styles from "./RailwayConcession.module.css";
import ApprovalInfo from "./ApprovalInfo";
import RemovalInfo from "./RemovalInfo";

const RailwayConcessionCard = ({ request }) => {
  const [isInfoWindowVisible, setInfoWindowVisibility] = useState(false);
  const [infoWindowText, setInfoWindowText] = useState("");
  const handleCloseInfoWindow = () => {
    setInfoWindowVisibility(false);
  };
  const handleApproveClick = () => {
    setInfoWindowText(
      <ApprovalInfo
        request={request}
        handleCloseInfoWindow={handleCloseInfoWindow}
      />
    );
    setInfoWindowVisibility(true);
  };

  const handleRejectClick = () => {
    setInfoWindowText(
      <RemovalInfo
        request={request}
        handleCloseInfoWindow={handleCloseInfoWindow}
      />
    );
    setInfoWindowVisibility(true);
  };

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
            {request.ageYears} Years
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
        <div className={styles.railwayConcessionCardFooterButtonDiv}>
          <button
            className={styles.railwayConcessionCardApproveButton}
            onClick={handleApproveClick}
          >
            Approve
          </button>
          <button
            className={styles.railwayConcessionCardRejectButton}
            onClick={handleRejectClick}
          >
            Reject
          </button>
        </div>
      </div>

      {isInfoWindowVisible && (
        <div>
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <div>{infoWindowText}</div>
              {/* <button onClick={handleCloseInfoWindow}>Go Back</button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RailwayConcessionCard;
