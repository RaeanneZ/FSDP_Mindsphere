import React from "react";
import Timeline from "../components/Timeline";

const timelineData = [
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
];

const B2BEnquiryTimelineTracker = () =>
  timelineData.length > 0 && (
    <div className="timeline-container">
      {timelineData.map((data, idx) => (
        <Timeline data={data} key={idx} />
      ))}
    </div>
  );

export default B2BEnquiryTimelineTracker;
