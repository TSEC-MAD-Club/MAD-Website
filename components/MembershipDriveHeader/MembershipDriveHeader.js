import styles from "../../styles/MembershipDrivePage/MembershipDriveHeader.module.css";
import Image from "next/image";

const MembershipDriveHeader = () => {
  return (
    <div>
      <div className={styles.header_container}>
        <div>
          <div className={styles.title}>
            <div>
              <h1
                className={styles.header_title}
                style={{
                  color: "var(--primary-3)",
                }}
              >
                Membership
              </h1>
              <h1
                className={styles.header_title}
                style={{ color: "var(--primary-4)" }}
              >
                Drive
              </h1>
              
            </div>
            <br />
            <button className={styles.header_button}>Start Learning</button>
            
          </div>
          <hr className={styles.dotted_line}/>
          <br/>
          {/* <hr className={styles.dotted_line_vertical}/> */}
        </div>
        <div>
          <div className={styles.image_container}>
            <img
              className={styles.sidebar}
              src="/assets/images/sidebar.png"
              // width={65}
              // height={429}
              // alt=""
            />
            <div className={styles.code_container}>
              <img
                className={styles.code}
                src="/assets/images/code.png"
                // width={540}
                // height={472}
              />
              <img
                className={styles.index_tab}
                src="/assets/images/index-tab.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDriveHeader;
