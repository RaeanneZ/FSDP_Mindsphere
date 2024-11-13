import React from "react";
import { geryllim, lisaseow, sharonchong } from "../utils";

const AboutReview = () => {
  const reviews = [
    {
      text: "I had the privilege of attending a remarkable leadership course by Mr. Simon Yio, ex COO of OrangeTee & Tie. The course was an eye-opening experience that delved deep into various leadership styles, expectations, and self-discovery as a leader.\n\nMr Yio’s expertise and guidance were instrumental in helping us understand the nuances of effective leadership. His approach was both insightful and engaging, providing a comprehensive overview of the different types of leadership and what they entail. The sessions were thoughtfully structured, ensuring that each participant could explore and identify their unique leadership strengths and areas for growth.",
      author: "Geryl Lim",
      avatar: geryllim,
    },
    {
      text: "I had the privilege of attending Simon Yio’s sales training and it has been an enriching experience. Through his guidance, I have not only honed my sales pitching techniques but have also gained profound insights into the dynamics of real estate sales.",
      author: "Lisa Seow",
      avatar: lisaseow,
    },
    {
      text: "One of Simon’s greatest strengths lies in his skillful use of analogies. He has a remarkable talent for drawing parallels that make abstract ideas relatable and concrete, leaving a lasting impact on his listeners. His analogies not only clarify the subject matter but also make it memorable, ensuring that his message resonates long after the speech concludes.",
      author: "Sharon Chong",
      avatar: sharonchong,
    },
  ];

  return (
    <section className="bg-[#F5F7FA] py-16 px-8 text-center">
      <h2 className="text-3xl font-semibold mb-2">Loved by parents locally.</h2>
      <p className="text-lg text-gray-600 mb-8">
        Learning is easy when you focus on what truly matters.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* First Review, spans two columns on large screens */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-left lg:col-span-2">
          <p className="mb-4 text-gray-700 whitespace-pre-line">
            {reviews[0].text}
          </p>
          <div className="flex items-center">
            <img
              src={reviews[0].avatar}
              alt={reviews[0].author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold text-gray-800">
              {reviews[0].author}
            </span>
          </div>
        </div>

        {/* Second and Third Reviews */}
        {reviews.slice(1).map((review, index) => (
          <div
            key={index + 1}
            className="bg-white p-6 rounded-lg shadow-lg text-left"
          >
            <p className="mb-4 text-gray-700 whitespace-pre-line">
              {review.text}
            </p>
            <div className="flex items-center">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold text-gray-800">
                {review.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutReview;
