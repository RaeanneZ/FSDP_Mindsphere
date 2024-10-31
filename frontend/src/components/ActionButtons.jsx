import { useState } from "react";
import { newsletter, survey, uparrow, whatsapp } from "../utils";

function ActionButtons() {
  const [hoveredButton, setHoveredButton] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 items-end">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/6581804413"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className={`bg-[#dcaf27] border-none cursor-pointer p-1 rounded-full shadow-lg transition-all duration-300 flex items-center justify-start h-14 z-20 ${
            hoveredButton === "whatsapp" ? "w-48" : "w-14"
          }`}
          id="whatsapp"
          onMouseEnter={() => handleMouseEnter("whatsapp")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white p-0.5 rounded-full flex items-center justify-center">
            <div className="bg-[#dcaf27] p-2 rounded-full">
              <img src={whatsapp} alt="WhatsApp" className="w-7 h-7" />
            </div>
          </div>
          {hoveredButton === "whatsapp" && (
            <span className="text-white text-lg font-bold ml-5">WhatsApp</span>
          )}
        </button>
      </a>

      {/* Newsletter Button */}
      <a href="#" target="_blank" rel="noopener noreferrer">
        <button
          className={`bg-[#dcaf27] border-none cursor-pointer p-1 rounded-full shadow-lg transition-all duration-300 flex items-center justify-start h-14 z-20 ${
            hoveredButton === "newsletter" ? "w-48" : "w-14"
          }`}
          id="newsletter"
          onMouseEnter={() => handleMouseEnter("newsletter")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white p-0.5 rounded-full flex items-center justify-center">
            <div className="bg-[#dcaf27] p-2 rounded-full">
              <img src={newsletter} alt="Newsletter" className="w-7 h-7" />
            </div>
          </div>
          {hoveredButton === "newsletter" && (
            <span className="text-white text-lg font-bold ml-5">
              Newsletter
            </span>
          )}
        </button>
      </a>

      {/* Survey Button */}
      <a href="#" target="_blank" rel="noopener noreferrer">
        <button
          className={`bg-[#dcaf27] border-none cursor-pointer p-1 rounded-full shadow-lg transition-all duration-300 flex items-center justify-start h-14 z-20 ${
            hoveredButton === "survey" ? "w-48" : "w-14"
          }`}
          id="survey"
          onMouseEnter={() => handleMouseEnter("survey")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white p-0.5 rounded-full flex items-center justify-center">
            <div className="bg-[#dcaf27] p-2 rounded-full">
              <img src={survey} alt="Survey" className="w-7 h-7" />
            </div>
          </div>
          {hoveredButton === "survey" && (
            <span className="text-white text-lg font-bold ml-5">Survey</span>
          )}
        </button>
      </a>

      {/* Scroll to Top Button (Doesn't Expand) */}
      <button
        className="bg-[#3A3A37] border-none cursor-pointer p-1 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 w-14 h-14 z-20"
        id="scrollTop"
        onClick={scrollToTop}
      >
        <div className="bg-white p-0.5 rounded-full flex items-center justify-center">
          <div className="bg-[#3A3A37] p-2 rounded-full">
            <img src={uparrow} alt="Top" className="w-7 h-7" />
          </div>
        </div>
      </button>
    </div>
  );
}

export default ActionButtons;
