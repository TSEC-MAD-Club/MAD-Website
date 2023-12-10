import RailwayRejectedConcessionCard from "./RailwayRejectedConcessionCard";
import styles from "./RailwayConcession.module.css";

const RailwayRejectedConcessionList = ({ Enquiries }) => {
  const concessionRequest = Enquiries || [];

  return (
    <div className={styles.scrollContainer}>
      {concessionRequest.length > 0 ? (
        concessionRequest.map((request, index) => (
          <RailwayRejectedConcessionCard key={index} request={request} />
        ))
      ) : (
        <h4>No requests found</h4>
      )}
    </div>
  );
};

export default RailwayRejectedConcessionList;
