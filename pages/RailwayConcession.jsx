import React, { useEffect, useState } from 'react';
import RailwayConcessionList from '../components/RailwayConcession/RailwayConcessionList';
import { UserContext } from "./_app";
import SideBar from "../components/Sidebar/Sidebar";
import { userTypes } from "../constants/userTypes";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

const RailwayConcession = () => {
  const { user } = React.useContext(UserContext);
  const [Enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchAllEnquiries = async () => {
    try {
      const concessionDetailsRef = collection(db, "ConcessionDetails");
      const concessionRequestRef = collection(db, "ConcessionRequest");

      const awaitingRequestsSnapshot = await getDocs(
        query(concessionRequestRef, where("status", "==", "unserviced"))
      );

      const fetchedEnquiries = [];

      const detailsRefs = [];

      awaitingRequestsSnapshot.docs.forEach((requestDoc) => {
        const concessionDetailsId = requestDoc.data().uid;
        if (concessionDetailsId) {
          detailsRefs.push(doc(concessionDetailsRef, concessionDetailsId));
        }
      });

      const detailsSnapshots = await Promise.all(detailsRefs.map(getDoc));

      detailsSnapshots.forEach((concessionDetailsDoc) => {
        if (concessionDetailsDoc.exists()) {
          const enquiry = concessionDetailsDoc.data();
          fetchedEnquiries.push(enquiry);
        }
      });

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

  useEffect(() => {
    if (!user.type.trim() || !(user.type == userTypes.RAILWAY)) {
      router.push("/");
    }
  }, [user]);

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
    marginLeft: '46vw',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', height: '100vh', marginRight: '3rem', overflow: 'hidden' }}>
      <SideBar user={user} />
      <div style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Railway Concessions</h1>
          </div>
          <div style={statusBoxStyle}>
            Pending <span style={{ fontWeight: 'bold', fontSize: '16' }}>{Enquiries.length}</span>
          </div>
        </div>
        {!loading ? <RailwayConcessionList Enquiries={Enquiries} fetchAllEnquiries={fetchAllEnquiries} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default RailwayConcession;
