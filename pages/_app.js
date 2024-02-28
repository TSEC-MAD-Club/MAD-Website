// pages/_app.js
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import "./css/resources.css";
import { ToastContainer } from "react-nextjs-toast";
import React, { useContext, useState } from "react";
import { ThemeContext, ThemeProvider } from "../src/context/ThemeContext";
import Spinner from "../components/Spinner"; // Import the Spinner component

const UserContext = React.createContext({
  loggedIn: false,
});

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    type: "",
    email: "",
    name: "",
  });
  const [showSpinner, setShowSpinner] = useState(false); // Add state for controlling spinner visibility

  //if user has set remember me
  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <ThemeProvider>
      <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
        <Head>
          {/* Responsive meta tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* bootstrap CDN */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
          ></script>
          <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        </Head>
        <ToastContainer />
        <Layout>
          {/* Conditional rendering of the Spinner */}
          {showSpinner && <Spinner />}
          <Component {...pageProps} setShowSpinner={setShowSpinner} />
        </Layout>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;

export { UserContext };
