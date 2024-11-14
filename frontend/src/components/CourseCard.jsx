// CourseCard.js
import React from "react";
import SemiCircleGauge from "./SemicircleGauge";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card h-full flex flex-col justify-center">
      <SemiCircleGauge
        currentCount={course.currentCount}
        maxCount={course.maxCount}
      />
      <h3>{course.title}</h3>
      <div className="sessions">
        {course.sessions.map((session, index) => (
          <div key={index} className="session">
            <div className="flex flex-col items-start">
              <p className="text-lg">{session.date}</p>
              <p>{session.level}</p>
            </div>

            <p>{session.status || `${session.slotsLeft} slots left`}</p>
          </div>
        ))}
      </div>
      <p className="more">More</p>
    </div>
  );
};

export default CourseCard;
