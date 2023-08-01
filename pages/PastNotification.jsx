import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import styles from "../components/Your Dashboard/DashboardNew.module.css";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
    const { user } = React.useContext(UserContext);
    const router = useRouter();
    const [Notifications, setNotifications] = useState([]);
    const [queryNotification, setQuery] = useState("");

    const keys = ["title", "message", "topic"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) =>
                item[key].toString().toLowerCase().includes(queryNotification.toLowerCase())
            )
        );
    }

    const fetchRecentNotifications = async () => {
        try {
            const notificationsRef = collection(db, "notifications");
            const q = query(notificationsRef, orderBy("notificationTime", "desc"));

            const querySnapshot = await getDocs(q);

            const fetchedNotifications = [];
            querySnapshot.forEach((doc) => {
                const notification = {
                    notificationTime: doc.data().notificationTime,
                    message: doc.data().message,
                    title: doc.data().title,
                    topic: doc.data().topic,
                    attachments: doc.data().attachments
                };
                fetchedNotifications.push(notification);
            });
            setNotifications(search(fetchedNotifications));
        } catch (error) {
            console.error("Error fetching recent notifications:", error);
        }
    };

    useEffect(() => {
        fetchRecentNotifications();
    }, [queryNotification]);

    const RenderNotifications = ({ data }) => {
        return data.map((notification, id) => {
            if (id < 10) {
                return (
                    <tr key={id} className={styles.tableRow}>
                        <td className={styles.tableCol}>{notification.title}</td>
                        <td className={styles.tableCol}>{notification.topic}</td>
                        <td className={styles.tableCol}>{notification.message}</td>
                        <td className={styles.tableCol}>
                            <a href={notification.attachments} className={styles.attachmentLink} target="_blank" rel="noopener noreferrer">View Attachment</a>
                        </td>
                        <td className={styles.tableCol}>{notification.notificationTime.toDate().toLocaleString()}</td>
                    </tr>
                );
            }
        });
    };

    useEffect(() => {
        if (!user.email.trim()) {
            router.push("/");
        }
    }, [user]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar user={user} />
            <div className={styles.root}>
                <div className={styles.recent} style={{ height: "90vh" }}>
                    <div className={styles.headings}>
                        <h3>Past Notifications</h3>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}></input>
                    </div>
                    <hr className={styles.hr} />
                    <table className={styles.table}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableCol}>Subject</th>
                            <th className={styles.tableCol}>Sent To</th>
                            <th className={styles.tableCol}>Description</th>
                            <th className={styles.tableCol}>Attachments</th>
                            <th className={styles.tableCol}>Date</th>
                        </tr>
                        {<RenderNotifications data={Notifications} />}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;