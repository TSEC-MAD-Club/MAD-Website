import RailwayUpdateConcessionCard from "./RailwayUpdateConcessionCard";
import styles from "./RailwayConcession.module.css";

const RailwayUpdateConcessionList = ({ Enquiries, fetchAllEnquiries }) => {
  const concessionRequest = Enquiries || [];

  return (
    <div className={styles.scrollContainer}>
      {concessionRequest.length > 0 ? (
        concessionRequest.map((request, index) => (
          <RailwayUpdateConcessionCard key={index} request={request} fetchAllEnquiries={fetchAllEnquiries} />
        ))
      ) : (
        <h4>No requests found</h4>
      )}
    </div>
  );
};

export default RailwayUpdateConcessionList;
