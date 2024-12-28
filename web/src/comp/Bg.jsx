import React from "react";

const Bg = () => {
  return (
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-md z-20"
        style={{ backgroundImage: "url('./bg2.png')" }}
        aria-hidden="true"
      ></div>
  );
};

export default Bg;
