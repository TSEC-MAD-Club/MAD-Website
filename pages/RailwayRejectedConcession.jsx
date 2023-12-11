import React, { useEffect, useState } from "react";
import styles from "../components/RailwayConcession/RailwayUpdateConcession.module.css";
import { UserContext } from "./_app.js";
import SideBar from "../components/Sidebar/Sidebar.jsx";
import { collection, query, limit, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import RailwayRejectedConcessionList from "../components/RailwayConcession/RailwayRejectedConcessionList.jsx";

const RailwayConcession = () => {
  const [certificateNumber, setCertificateNumber] = useState("");
  const { user } = React.useContext(UserContext);
  const [Enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllEnquiries = async () => {
    try {
      const concessionDetailsRef = collection(db, "ConcessionDetails");
      const concessionRequestRef = collection(db, "ConcessionRequest");

      // Get unserviced requests
      const unservicedRequestsSnapshot = await getDocs(
        query(concessionRequestRef, where("status", "==", "rejected"))
      );
      const fetchedEnquiries = [];

      // Iterate through unserviced requests
      for (const requestDoc of unservicedRequestsSnapshot.docs) {
        // Get the associated ConcessionDetails document
        const concessionDetailsId = requestDoc.data().uid;
        // Check if the ConcessionDetailsId is valid

        if (concessionDetailsId) {
          const concessionDetailsDoc = await getDoc(
            doc(concessionDetailsRef, concessionDetailsId)
          );

          // Check if the ConcessionDetails document exists
          if (concessionDetailsDoc.exists()) {
            const enquiry = concessionDetailsDoc.data();
            fetchedEnquiries.push(enquiry);
          }
        }
      }

      setEnquiries(fetchedEnquiries);
    } catch (error) {
      console.error("Error fetching recent enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEnquiries();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        height: "100vh",
        marginRight: "3rem"
      }}
    >
      <SideBar user={user} />
      <div style={{ padding: "16px", marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "3rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
              Update or Cancel a Concession
            </h1>
            <p
              style={{
                fontSize: "16px",
                marginBottom: "16px",
                color: "var(--primary-2)",
              }}
            >
              Update a Concession entry by extending its date or Cancel a it
            </p>
            <div
              className={styles.certificateSection}
              style={{ width: "60%", marginTop: "4rem", marginBottom: "2rem" }}
            >
              <span className={styles.modalInformation}>
                Enter Certificate Number
              </span>
              <input
                onChange={(e) => {
                  setCertificateNumber(e.target.value);
                }}
                style={{ border: "1px solid #D9D9D9", width: "110%" }}
              ></input>
            </div>
          </div>
        </div>
        {!loading ? <RailwayRejectedConcessionList Enquiries={Enquiries} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default RailwayConcession;
