import { TypeAnimation } from "react-type-animation";
export default function Footer() {
  return (
    <>
      <div className="px-2 py-2">
        <div className="flex items-center justify-center text-center px-7 py-7 bg-gray-100 rounded-lg">
          <p className="w-full">
            <TypeAnimation
              sequence={[
                
                "Proudly engineered at Golden West High School❤️",
                5000, 
               
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: ".9em", display: "inline-block" }}
              repeat={Infinity}
            />
          </p>
        </div>
      </div>
    </>
  );
}
