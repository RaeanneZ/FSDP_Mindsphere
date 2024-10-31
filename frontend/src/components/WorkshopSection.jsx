// WorkshopSection.jsx
import React from "react";
import PropTypes from "prop-types";

const WorkshopSection = ({ pricingPlans, testimonials, onSelectPlan }) => {
  return (
    <div className="flex justify-center py-16 px-4">
      <div className="w-full max-w-7xl bg-[#FFF6E0] rounded-xl p-6 sm:p-10 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Public Speaking Workshops
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mt-4">
            We identify with what makes a speaker influential and his presence
            compelling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 sm:p-8 w-full text-center shadow-md ${
                index % 2 === 0 ? "bg-blue-100" : "bg-white"
              } flex flex-col justify-between`}
            >
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
                  ${plan.price}
                </p>
                {plan.oldPrice && (
                  <p className="text-base sm:text-lg text-gray-500 line-through mt-1">
                    Was ${plan.oldPrice}
                  </p>
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-2">
                  {plan.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mt-2">
                  {plan.description}
                </p>
              </div>
              <button
                onClick={() => onSelectPlan(plan)}
                className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 text-base sm:text-lg font-semibold"
              >
                {plan.buttonText}
              </button>
              <ul className="text-sm sm:text-base text-gray-700 text-left mt-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-4 h-4 text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-center text-sm mt-6">
          *Only applicable for soft launch promotion
        </p>

        {/* Testimonials */}
        <div className="mt-16 px-4 py-10 bg-blue-50 rounded-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Hear from our learners
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-6 shadow-md"
              >
                <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

WorkshopSection.propTypes = {
  pricingPlans: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      oldPrice: PropTypes.string,
      description: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      buttonText: PropTypes.string.isRequired,
    })
  ),
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      feedback: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
  onSelectPlan: PropTypes.func.isRequired,
};

WorkshopSection.defaultProps = {
  pricingPlans: [
    {
      title: "Sample Plan",
      price: "0",
      oldPrice: "100",
      description: "This is a sample plan for demonstration purposes.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      buttonText: "Get started",
    },
  ],
  testimonials: [
    {
      feedback:
        "This is a sample testimonial. It is here to demonstrate what a user review would look like.",
      name: "Sample User",
      title: "Position",
      avatar: "https://via.placeholder.com/40",
    },
  ],
};

export default WorkshopSection;
