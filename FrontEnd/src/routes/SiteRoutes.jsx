import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Work from "../pages/Work";
import Education from "../pages/Education"; // Import the Education component
import PageNotFound from "../pages/PageNotFound";

export default function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/work" element={<Work />} />
      <Route path="/education" element={<Education />} /> {/* Add the Education route */}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}
