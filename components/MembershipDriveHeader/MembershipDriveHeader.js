import styles from "./MembershipDriveHeader.module.css";

const MembershipDriveHeader = () => {
  return (
    <div>
      <div className={styles.header_container}>
        <div>
          <div className={styles.title}>
            <div>
              <h1 className={styles.header_title}
                style={{
                  color: "var(--primary-3)"
                }}
              >
                Membership
              </h1>
              {/* <br /> */}
              <h1 className={styles.header_title} style={{color: "var(--primary-4)"}}>Drive</h1>
            </div>
            <br />
            <button className={styles.header_button}>Start Learning</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MembershipDriveHeader;
