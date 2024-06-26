import React from "react";
import Image from "next/image";
import nextsvg from "../public/next.svg";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Image src={nextsvg} alt="saturday" className="" />
      <div className="md:min-w-[60%]">
        <h1 className="text-[36px] mb-8">
          Implementation for Three.js <br />
          based on fiber and drei
        </h1>
        <span>Exact instructions could be found in Documentation</span>
      </div>
    </div>
  );
};

export default HeroSection;
