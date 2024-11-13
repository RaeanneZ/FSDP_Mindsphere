// EnquiryList.js
import React from "react";

const EnquiryList = ({ data, selectedCategory }) => {
  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : [];

  return (
    <div style={{ width: "300px" }}>
      <h2>{selectedCategory || "Select a category"}</h2>
      {filteredData.length === 0 ? (
        <p>No enquiries to show</p>
      ) : (
        filteredData.map((enquiry) => (
          <div key={enquiry.id} className="enquiry-item">
            <p>
              <strong>Enquiry ID:</strong> {enquiry.id}
            </p>
            <p>
              <strong>Organization:</strong> {enquiry.organization}
            </p>
            <p>
              <strong>Callback Time:</strong> {enquiry.callbackTime}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default EnquiryList;
