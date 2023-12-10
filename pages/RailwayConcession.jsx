import React, { useEffect, useState } from 'react';
import RailwayConcessionList from '../components/RailwayConcession/RailwayConcessionList';
import { UserContext } from "./_app";
import SideBar from "../components/Sidebar/Sidebar";
import { collection, query, limit, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const RailwayConcession = () => {
  const { user } = React.useContext(UserContext);
  const [Enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllEnquiries = async () => {
    try {
      const concessionDetailsRef = collection(db, "ConcessionDetails");
      const concessionRequestRef = collection(db, "ConcessionRequest");

      // Get unserviced requests
      const unservicedRequestsSnapshot = await getDocs(
        query(concessionRequestRef, where("status", "==", "unserviced"))
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

  const statusBoxStyle = {
    backgroundColor: 'var(--primary-5)',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--primary-2)',
    width: '7%',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', height: '100vh', marginRight: '3rem', overflow: 'hidden' }}>
      <SideBar user={user} />
      <div style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Railway Concessions</h1>
            <p style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--primary-2)' }}>Create a Note about something for the students</p>
          </div>
          <div style={statusBoxStyle}>
            Pending <span style={{ fontWeight: 'bold', fontSize: '16' }}>{Enquiries.length}</span>
          </div>
        </div>
        {!loading ? <RailwayConcessionList Enquiries={Enquiries} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default RailwayConcession;
