import { useContext, useEffect, useState } from "react";
import styles from "../components/Your Dashboard/DashboardNew.module.css";
import { UserContext } from "./_app";
import SideBar from "../components/Sidebar/Sidebar";
import { collection, query, limit, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import fetchAllEnquiries from "../components/GenerateCSV";
import { userTypes } from "../constants/userTypes";
import { useRouter } from "next/router";

const Downloads = () => {
    const { user } = useContext(UserContext);
    const [enquiries, setEnquiries] = useState();
    const [filtered, setFiltered] = useState();
    const [queryCSV, setQuery] = useState("");
    const [servicedCounts, setServicedCounts] = useState({
        western: null,
        central: null,
        harbour: null,
    });
    const router = useRouter();
    const keys = ["fileName", "railway", 'firstName', 'lastName'];

    const search = (data) => {
        return data?.filter((item) =>
            keys.some((key) =>
                item[key].toString().toLowerCase().includes(queryCSV.toLowerCase())
            )
        );
    }

    const fetchEnquiries = async () => {
        const csvCollectionRef = collection(db, 'csvCollection');
        const querySnapshot = await getDocs(csvCollectionRef);
        const data = querySnapshot.docs.map(doc => doc.data());
        /* `setEnquiries(data)` is updating the state variable `enquiries` with the value of `data`.
        This means that the `enquiries` state variable will now hold the array of data retrieved
        from the `csvCollection` collection in the Firebase Firestore. */
        setEnquiries(data);
        setFiltered(data);
    };

    const filterEnquiries = async () => {
        setFiltered(search(enquiries));
    }

    useEffect(() => {
        filterEnquiries();
    }, [queryCSV]);

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

    const countServicedEntries = async (travelLane) => {
        try {
            const concessionRequestRef = collection(db, 'ConcessionRequest');
            const concessionDetailsRef = collection(db, 'ConcessionDetails');

            /* The filter specifies that the "status" field of the documents should be equal to "approved". The
            result of the query is stored in the `westernRequestsSnapshot` variable. */
            const westernRequestsSnapshot = await getDocs(
                query(concessionRequestRef,
                    where('status', '==', 'approved'),
                )
            );

            let count = 0;

            // Iterate through approved requests
            for (const requestDoc of westernRequestsSnapshot.docs) {
                const concessionDetailsId = requestDoc.data().uid;

                if (concessionDetailsId) {
                    const concessionDetailsDoc = await getDoc(
                        doc(concessionDetailsRef, concessionDetailsId)
                    );

                    // Check if the ConcessionDetails document exists and matches the travelLane
                    if (concessionDetailsDoc.exists() && concessionDetailsDoc.data().travelLane === travelLane) {
                        count++;
                    }
                }
            }
            return count;
        } catch (error) {
            console.error('Error counting approved entries:', error);
        }
    };

    const fetchAndSetServicedCount = async (travelLane) => {
        try {
            const count = await countServicedEntries(travelLane);
            setServicedCounts((prevCounts) => ({ ...prevCounts, [travelLane]: count }));
            /* The code is checking if the `count`
            variable is greater than or equal to 100. If it is, it calls the `handleClick` function
            with the `travelLane` parameter. This is likely used to trigger some action when the
            count of serviced entries reaches a certain threshold (in this case, 100). */
            if (count >= 100)
                await handleClick(travelLane);
        } catch (error) {
            console.error(`Error fetching ${travelLane} approved count:`, error);
        }
    };

    const handleClick = async (region) => {
        await fetchAllEnquiries(region);
        await fetchEnquiries();
        await fetchAndSetServicedCount(region);
    };

    const buttons = [
        { region: 'western', label: 'Western' },
        { region: 'central', label: 'Central' }
    ];

    useEffect(() => {
        fetchEnquiries();
        fetchAndSetServicedCount('western');
        fetchAndSetServicedCount('central')
    }, []);

    useEffect(() => {
        if (!user.type.trim() || !(user.type == userTypes.RAILWAY)) {
            router.push("/");
        }
    }, [user]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SideBar user={user} />
            <div className={styles.root}>
                <div className={styles.operations} style={{ minHeight: '0' }}>
                    <div className={styles.twobutton}>
                        {buttons.map((button) => (
                            <button
                                key={button.region}
                                className={styles.item}
                                style={{ width: '36.5vw', height: '16vh' }}
                                onClick={() => handleClick(button.region)}
                            >
                                {button.label}: {servicedCounts[button.region] !== null ? servicedCounts[button.region] : 'Loading...'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.recent} style={{ height: '76vh' }}>
                    <div className={styles.headings}>
                        <h3>Previous CSV collection</h3>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}></input>
                    </div>
                    <table className={styles.table}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableCol}>File Name</th>
                            <th className={styles.tableCol}>Railway</th>
                            <th className={styles.tableCol}>Link</th>
                            <th className={styles.tableCol}>Date</th>
                        </tr>
                        {filtered?.map((enquiry, id) => (
                            <tr key={id} className={styles.tableRow}>
                                <td className={styles.tableCol}>{enquiry.fileName}</td>
                                <td className={styles.tableCol}>{enquiry.railway}</td>
                                <td className={styles.tableCol}><a href={enquiry.content} target="_blank">Link</a></td>
                                <td className={styles.tableCol}>
                                    {convertDate(enquiry.timestamp)}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Downloads