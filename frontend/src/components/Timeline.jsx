import React from "react";

const colorCodes = [
  {
    Tag: "Incomplete",
    color: "#dbe0e2",
  },
  {
    Tag: "Pending",
    color: "#edc55b",
  },
  {
    Tag: "Completed",
    color: "#018f69",
  },
];
const Timeline = ({ data }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span
          className="tag rounded"
          style={{
            background: colorCodes.find((obj) => obj.Tag === data.Tag)?.color,
          }}
        >
          {data.Tag}
        </span>
        <time>{data.createdDate}</time>
        <p>{data.Text}</p>
        {data.linkToPDF && (
          <a href={data.linkToPDF} target="_blank" rel="noopener noreferrer">
            View Document Here
          </a>
        )}
        <span className="circle" />
      </div>
    </div>
  );
};

export default Timeline;
