import Navbar from "../Navbar";
import Footer from "../Footer";
import { UserContext } from "../../pages/_app";

import React from "react";
import { ThemeContext } from "../../src/context/ThemeContext";

export default function Layout({ children }) {
  const { theme } = React.useContext(ThemeContext);
  const { loggedIn } = React.useContext(UserContext);

  return (
    <>
      {loggedIn && <Navbar />}
      <main id={theme} className="App">
        {children}
      </main>
      {loggedIn && <Footer />}
    </>
  );
}
