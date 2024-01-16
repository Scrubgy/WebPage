import React from "react";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import WorkExperienceCard from "../components/WorkExperience";
import PreloadModel from "../components/PreloadModel"; // Import the Preload Component
import WhoAreWe from "../components/WhoAreWe";

export default function Home() {
  return (
    <>
      <PreloadModel /> {/* This will start loading the model */}
      <Profile />
      <WhoAreWe/>
    
      <WorkExperienceCard />
      
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-semibold">Scrubgy</h1>
        <p className="text-md font-normal text-gray-500 text-center px-3">
         Cleanses the Sol🫧
        </p>
        <p className="text-md font-normal text-gray-500 text-center px-3">
        Visalia, CA 📍
        </p>
      </div>
    </>
  );
}
