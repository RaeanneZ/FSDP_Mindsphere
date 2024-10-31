// SpecialRequest.jsx
import React from "react";

const SpecialRequest = ({ specialRequest, setSpecialRequest }) => (
  <div className="mb-6">
    <h4 className="font-semibold text-lg mb-2">Special Request</h4>
    <textarea
      placeholder="Write any special requests here..."
      value={specialRequest}
      onChange={(e) => setSpecialRequest(e.target.value)}
      className="w-full border rounded px-3 py-2"
      rows={4}
    />
  </div>
);

export default SpecialRequest;
