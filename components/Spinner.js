// components/Spinner.js
import React from "react";
import Image from "next/image";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      {/* Use the next/image component to reference the GIF */}
      <Image
        src="/assets/images/loader.gif"
        alt="Loading..."
        width={100}
        height={100}
        className="spinner"
      />
      <style jsx>{`
        .spinnerContainer {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999; /* Ensure spinner is on top of other content */
        }
      `}</style>
    </div>
  );
};

export default Spinner;
