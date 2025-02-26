import React from "react";

const AboutInput = ({ about, setAbout }) => {
  return (
    <textarea
      placeholder="Enter About Section"
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      className="border p-2 rounded w-full h-20"
    ></textarea>
  );
};

export default AboutInput;
