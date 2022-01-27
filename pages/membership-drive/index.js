import MembershipDriveHeader from "../../components/MembershipDriveHeader/MembershipDriveHeader";
import DevelopmentDomain from "../../components/MembershipDriveRoadmap/DevelopmentDomain";
const MembershipDrive = () => {
  return (
    <div style={{ backgroundColor: "var(--primary-1)" }}>
      <MembershipDriveHeader />
      <DevelopmentDomain />
    </div>
  );
};

export default MembershipDrive;
