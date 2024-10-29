import React from "react";
import PropTypes from "prop-types";

const WorkshopSection = ({ pricingPlans, testimonials }) => {
  return (
    <div className="flex justify-center py-16">
      <div className="w-full max-w-7xl bg-[#FFF6E0] rounded-xl p-10 mx-auto">
        {/* Workshop Introduction */}
        <div className="text-center px-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Public Speaking Workshops
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            We identify with what makes a speaker influential and his presence
            compelling.
          </p>
          <p className="text-lg text-gray-700">
            Our tiered public speaking workshops are thoughtfully designed to
            transform your child into a seasoned stage storyteller through
            comprehensive training.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            From dynamic activities to ample stage time, your child will acquire
            the skills and confidence to shine under the spotlight.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Watch them thrive as they learn the art and science of impactful
            speaking in a supportive and energetic environment.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Gift your child a breakthrough in powerful communication today,
            reach out to us for the programme synopsis and workshop coverage!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex justify-center gap-8 px-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 w-full max-w-xs text-center shadow-md ${
                index % 2 === 0 ? "bg-blue-100" : "bg-white"
              } flex flex-col justify-between`}
            >
              <div>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  ${plan.price}
                  <span className="text-lg">*</span>
                </p>
                {plan.oldPrice ? (
                  <p className="text-lg text-gray-500 line-through mt-1">
                    Was ${plan.oldPrice}
                  </p>
                ) : (
                  <div className="h-6 mt-1"></div> /* Placeholder to ensure button alignment */
                )}
                <h3 className="text-xl font-semibold text-gray-800 mt-2">
                  {plan.title}
                </h3>
                <p className="text-gray-700 mt-2">{plan.description}</p>
              </div>
              <button className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 text-lg font-semibold">
                {plan.buttonText}
              </button>
              <ul className="text-gray-700 text-left mt-6 space-y-2">
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
        <div className="mt-16 px-4 bg-blue-50 rounded-lg py-10">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Hear from our learners
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
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
