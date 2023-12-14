import React, { useEffect, useState } from "react";
import styles from "../components/RailwayConcession/RailwayUpdateConcession.module.css";
import RailwayUpdateConcessionList from "../components/RailwayConcession/RailwayUpdateConcessionList.jsx";
import { UserContext } from "./_app";
import SideBar from "../components/Sidebar/Sidebar";
import { collection, query, limit, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { userTypes } from "../constants/userTypes";

const RailwayConcession = () => {
  const [Name, setName] = useState("");
  const { user } = React.useContext(UserContext);
  const [Enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const keys = ["firstName"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) =>
        item[key].toString().toLowerCase().includes(Name.toLowerCase())
      )
    );
  }

  const fetchAllEnquiries = async () => {
    try {
      const concessionDetailsRef = collection(db, "ConcessionDetails");
      const concessionRequestRef = collection(db, "ConcessionRequest");

      // Get awaiting requests
      const awaitingRequestsSnapshot = await getDocs(
        query(concessionRequestRef, where("status", "==", "approved"), limit(10))
      );

      const fetchedEnquiries = [];

      // Iterate through awaiting requests
      for (const requestDoc of awaitingRequestsSnapshot.docs) {
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

      setEnquiries(search(fetchedEnquiries));
    } catch (error) {
      console.error("Error fetching recent enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEnquiries();
  }, [Name]);

  useEffect(() => {
    if (!user.type.trim() || !(user.type == userTypes.RAILWAY)) {
      router.push("/");
    }
  }, [user]);

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
            <div
              className={styles.certificateSection}
              style={{ width: "60%", marginTop: "4rem", marginBottom: "2rem" }}
            >
              <span className={styles.modalInformation}>
                Search Name
              </span>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{ border: "1px solid #D9D9D9", width: "110%" }}
              ></input>
            </div>
          </div>
        </div>
        {!loading ? <RailwayUpdateConcessionList Enquiries={Enquiries} fetchAllEnquiries={fetchAllEnquiries} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default RailwayConcession;
