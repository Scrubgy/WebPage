import { getConfigData } from "../data/configReader"; // Adjust the path as necessary

export default function Work() {
  const configData = getConfigData();
  const workExperiences = configData.workExperiences;

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Work Experience</h1>
      <div className="px-2"> {/* Horizontal spacing */}
        <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5 mb-5 shadow-lg"> {/* Increased bottom padding */}
          <div className="flex flex-wrap justify-center"> {/* Adjust layout as needed */}
            {workExperiences.map((experience, index) => (
              <div key={index} className="m-4">
                <div className="card bg-white rounded-lg px-5 py-3 shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img
                        className="w-16 h-16 rounded-full mx-auto md:mx-0 md:mr-4"
                        src={experience["company-logo-url"]}
                        alt={experience["company-name"]}
                      />
                    </div>
                    <div className="md:w-3/4 mt-4 md:mt-0">
                      <h2 className="text-lg font-bold">{experience["role"]} at {experience["company-name"]}</h2>
                      <p className="text-gray-600">{experience["duration"]}</p>
                      <p className="text-gray-500">{experience["description"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
