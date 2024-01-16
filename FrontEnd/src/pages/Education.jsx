import ucmModel from "../assets/ucm.glb";
import { getConfigData } from "../data/configReader";
import React, { useState } from "react";
import ModelViewer from "../components/ModelViewer";
import './Education.css'
export default function Education() {
  const configData = getConfigData();
  const educationData = configData.education;
  const accomplishments = configData.accomplishments || [];

  // Hover state for the accomplishments
  const [isHovered, setIsHovered] = useState(false);

  // Hover effect handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // SVG class based on hover state
  const svgClass = isHovered
    ? "w-6 h-6 text-gray-500 transition delay-150"
    : "w-6 h-6 text-gray-300";

    return (
      <>
        <h1 className="text-center text-2xl font-bold my-4">Education</h1>
        <div className="px-2">
          <div className="flex flex-col bg-gray-100 rounded-lg p-5 mb-2 shadow-lg">
            {educationData.map((education, index) => (
              <div key={index} className="mx-auto my-5">
                <div className="card bg-white rounded-lg p-5 shadow-lg w-full md:w-full min-w-0 max-w-full">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mt-2 mx-auto">
                      <img
                        src={education["institution-logo-url"]}
                        alt={education["institution-name"]}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h2 className="text-xl font-semibold mt-4 text-center">
                      {education["institution-name"]}
                    </h2>
                    <p className="text-md text-gray-600 text-center">
                      {education.degree}, {education["field-of-study"]}
                    </p>
                    <p className="text-md text-gray-500 text-center">
                      Graduated in {education["graduation-year"]}
                    </p>
                    <p className="mt-2 text-center">{education.description}</p>
                    {education["3d-model-url"] && (
                      <div className="w-full max-w-xs mx-auto mt-4">
                        <ModelViewer modelUrl={ucmModel} />
                        <p className="text-center text-sm text-gray-600 mt-2">
                          UC Merced New Beginnings Sculpture
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
  
          </div>
        </div>

      {accomplishments.length > 0 && (
        <>
          <h2 className="text-center text-xl font-bold mt-0 mb-4">
            Accomplishments
          </h2>
          <div className="px-2">
            <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5 mb-5 shadow-lg">
              {accomplishments.map((item, index) => (
                <a
                  key={index}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="max-w-2xl mx-auto my-1 card bg-white rounded-lg px-5 py-3 shadow-lg hover:-translate-y-1 hover:scale-100 duration-300 transition ease-in-out delay-150 hover:shadow-sm block border border-gray-200 hover:border-gray-300 flex justify-between items-center"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.year}</p>
                    <p className="text-md text-gray-500">{item.description}</p>
                  </div>
                  <svg
                    className={svgClass}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}