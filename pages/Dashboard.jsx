import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import YourDashboard from '../components/Your Dashboard/YourDashboard';
import { UserContext } from "./_app";
const Dashboard = () => {
  const { user } = React.useContext(UserContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <Sidebar user={user} />
    <YourDashboard />
    </div>
  )
}

export default Dashboard;