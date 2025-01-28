import React from "react";
import Timeline from "../components/Timeline";
import backendService from "../utils/backendService";

const timelineData = [
  {
    text: "Sent Enquiry",
    date: "January 01 2025",
    tag: "Completed",
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
    },
  },
  {
    text: "Proposal Draft 1",
    date: "January 18 2025",
    tag: "Pending",
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
    },
  },
  {
    text: "Finalize Proposal",
    date: "Feburary 03 2025",
    tag: "Incomplete",
  },
  {
    text: "Full Payment",
    date: "March 03 2025",
    tag: "Incomplete",
  },
];

const { dashboardService } = backendService;

const getBizData = async (e) => {
  const result = dashboardService.retrieveEnquiryTimeline(3);
  console.log(result);
};
getBizData();

const B2BEnquiryTimelineTracker = () =>
  timelineData.length > 0 && (
    <div className="timeline-container">
      {timelineData.map((data, idx) => (
        <Timeline data={data} key={idx} />
      ))}
    </div>
  );

export default B2BEnquiryTimelineTracker;
