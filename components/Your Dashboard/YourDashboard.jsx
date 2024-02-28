import { useEffect, useState } from "react";
import styles from "./DashboardNew.module.css";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import Features from "../Sidebar/link";
import { userTypes } from "../../constants/userTypes";
import Spinner from "../Spinner";

function YourDashboard({ user }) {
  const [loading, setLoading] = useState(false);
  const [Notifications, setNotifications] = useState([]);

  const fetchRecentNotifications = async () => {
    setLoading(true);
    try {
      const notificationsRef = collection(db, "notifications");
      const q = query(
        notificationsRef,
        orderBy("notificationTime", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      const fetchedNotifications = [];
      querySnapshot.forEach((doc) => {
        const notification = {
          notificationTime: doc.data().notificationTime,
          message: doc.data().message,
          title: doc.data().title,
          topic: doc.data().topic,
        };
        fetchedNotifications.push(notification);
      });
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching recent notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentNotifications();
  }, []);

  const userHasAccess = (data) => {
    if (data.mainTitle === "Dashboard") return false;
    return data.type.length === 0 || data.type.includes(user?.type);
  };

  const handleButtonClick = async () => {
    setLoading(true); // Set loading state to true

    try {
      // Simulate loading for a certain duration
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust the duration as needed

      // After the loading is completed, proceed to open the main link or perform any other operation
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after the operation is completed
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className={styles.headerText}>Your Dashboard</h1>
          <hr />
          <div className={styles.operations}>
            <div className={styles.twobutton}>
              {Features.map((data, id) =>
                userHasAccess(data) ? (
                  <Link href={data.mainLink}>
                    <button
                      key={id}
                      className={styles.item}
                      onClick={handleButtonClick}
                    >
                      {data.mainTitle}
                    </button>
                  </Link>
                ) : null
              )}
            </div>
          </div>
          {!(
            user.type === userTypes.RAILWAY || user.type === userTypes.COMMITTEE
          ) && (
              <div className={styles.recent}>
                <h3>Recent Notifications & Notices</h3>
                <hr className={styles.hr} />
                <table className={styles.table}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableCol}>Subject</th>
                    <th className={styles.tableCol}>Sent To</th>
                    <th className={styles.tableCol}>Description</th>
                    <th className={styles.tableCol}>Date</th>
                  </tr>
                  {Notifications.map((notification, id) => (
                    <tr key={id} className={styles.tableRow}>
                      <td className={styles.tableCol}>{notification.title}</td>
                      <td className={styles.tableCol}>{notification.topic}</td>
                      <td className={styles.tableCol}>{notification.message}</td>
                      <td className={styles.tableCol}>
                        {notification.notificationTime.toDate().toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
        </>
      )}
    </div>
  );
}

export default YourDashboard;
