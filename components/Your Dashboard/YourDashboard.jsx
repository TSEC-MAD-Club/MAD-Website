import styles from "./DashboardNew.module.css";

function YourDashboard() {
  return (
    <div className={styles.root}>
      <h1 className={styles.headerText}>Your Dashboard</h1>
      <hr />
                <div className={styles.operations}>
                       <div className={styles.twobutton}>
        <button className={styles.item}>Create Notification</button>
                              <button className={styles.item}>Create Note</button>
                       </div>
                       <div className={styles.twobutton}>
        <button className={styles.item}>View Past Notifications</button>
                       <button className={styles.item}>View Past Notes</button>
                       </div>
      </div>
      <div className={styles.recent}>
        <h3>Recent Notifications & Notices</h3>
        <hr className={styles.hr} />
        <table className={styles.table}>
          <tr className={styles.tableRow}>
            <th className={styles.tableCol}>Subject</th>
            <th className={styles.tableCol}>Description</th>
            <th className={styles.tableCol}>Date</th>
            <th className={styles.tableCol}>Type</th>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableCol}>Notification 1</td>
            <td className={styles.tableCol}>
              This notification is for the purpose of notifying...
            </td>
            <td className={styles.tableCol}>01/05/2023</td>
            <td className={styles.tableCol}>Notification</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableCol}>Note 1</td>
            <td className={styles.tableCol}>
              This note is for the purpose of explaining that...
            </td>
            <td className={styles.tableCol}>04/05/2023</td>
            <td className={styles.tableCol}>Note</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableCol}>Notification 2</td>
            <td className={styles.tableCol}>
              This notification is for the purpose of notifying...
            </td>
            <td className={styles.tableCol}>12/05/2023</td>
            <td className={styles.tableCol}>Notification</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default YourDashboard;