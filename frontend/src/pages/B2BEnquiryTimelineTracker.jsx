import React from "react";
import Timeline from "../components/Timeline";

const timelineData = [
  {
    text: "Sent Enquiry",
    date: "January 01 2025",
    category: {
      tag: "Completed",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "View Document Here",
    },
  },
  {
    text: "Proposal Draft 1",
    date: "January 18 2025",
    category: {
      tag: "Pending",
      color: "#edc55b",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "View Document Here",
    },
  },
  {
    text: "Finalize Proposal",
    date: "Feburary 03 2025",
    category: {
      tag: "Incomplete",
      color: "#dbe0e2",
    },
  },
  {
    text: "Full Payment",
    date: "March 03 2025",
    category: {
      tag: "Incomplete",
      color: "#dbe0e2",
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
