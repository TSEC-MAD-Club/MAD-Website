import RailwayConcessionCard from "./RailwayConcessionCard";
import styles from "./RailwayConcession.module.css";

const RailwayConcessionList = ({ Enquiries }) => {
  const concessionRequest = Enquiries || [];

  return (
    <div className={styles.scrollContainer}>
      {concessionRequest.length > 0 ? (
        concessionRequest.map((request, index) => (
          <RailwayConcessionCard key={index} request={request} />
        ))
      ) : (
        <h4>No requests found</h4>
      )}
    </div>
  );
};


export default RailwayConcessionList;