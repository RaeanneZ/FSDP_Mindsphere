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
            {selectedCategory === "New Enquiries" && (
              <p>
                <strong>Callback Time:</strong> {enquiry.callbackTime}
              </p>
            )}
            {selectedCategory === "Discussions in Progress" && (
              <p>
                <strong>Response Time:</strong> {enquiry.callbackTime}
              </p>
            )}
            {selectedCategory === "Confirmed" && (
              <p>
                <strong>Delivery Time:</strong> {enquiry.callbackTime}
              </p>
            )}
            {selectedCategory === "Delivered" && null}
          </div>
        ))
      )}
    </div>
  );
};

export default EnquiryList;
