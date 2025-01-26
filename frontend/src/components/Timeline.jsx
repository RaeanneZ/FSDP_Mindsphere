import React from "react";

const colorCodes = [
  {
    tag: "Incomplete",
    color: "#dbe0e2",
  },
  {
    tag: "Pending",
    color: "#edc55b",
  },
  {
    tag: "Completed",
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
            background: colorCodes.find((obj) => obj.tag === data.tag)?.color,
          }}
        >
          {data.tag}
        </span>
        <time>{data.date}</time>
        <p>{data.text}</p>
        {data.link && (
          <a href={data.link.url} target="_blank" rel="noopener noreferrer">
            View Document Here
          </a>
        )}
        <span className="circle" />
      </div>
    </div>
  );
};

export default Timeline;
