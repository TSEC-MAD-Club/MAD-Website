import React, { useEffect } from "react";
import Login from "./Login";
import { UserContext } from "./_app";
import Sidebar from '../components/Sidebar/Sidebar';
import YourDashboard from '../components/Your Dashboard/YourDashboard';

export default function Home() {
  const { loggedIn, setLoggedIn, user, setUser } =
    React.useContext(UserContext);

  useEffect(() => {
    isAuthenticatedFn();
  }, []);

  function isAuthenticatedFn() {
    if (user.email) {
      return true;
    }
  }

  return (
    <>
      {loggedIn ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Sidebar user={user} />
          <YourDashboard user={user} />
        </div>
      ) : (
        <Login
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUser={setUser}
        />
      )}
    </>
  );
}
