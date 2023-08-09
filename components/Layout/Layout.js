import React from "react";
import { ThemeContext } from "../../src/context/ThemeContext";

export default function Layout({ children }) {
  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      <main id={theme} className="App">
        {children}
      </main>
    </>
  );
}
