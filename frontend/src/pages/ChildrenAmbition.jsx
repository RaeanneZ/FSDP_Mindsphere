import React from "react";

const ChildrenAmbition = ({ job, setJob, reasonJob, setReasonJob, errors }) => {
  return (
    <div className="w-full h-full py-20">
      <div className="text-center md:mx-10">
        <div className="flex justify-center mb-8">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot active"></div>
        </div>
        {/* Container with the question and error message */}
        <div className="mb-8">
          <h1 className="text-xl font-bold">And I want to be a</h1>
          {errors.job && <p className="text-red-500 text-sm">{errors.job}</p>}
        </div>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="border-b border-yellow bg-transparent w-[50%] mx-auto mb-8 text-center outline-none"
          required
        />

        {/* Container with the question and error message */}
        <div className="mb-8">
          <h1 className="text-xl font-bold">When I grow up because</h1>
          {errors.reasonJob && (
            <p className="text-red-500 text-sm">{errors.reasonJob}</p>
          )}
        </div>
        <input
          type="text"
          value={reasonJob}
          onChange={(e) => setReasonJob(e.target.value)}
          className="border-b border-yellow bg-transparent w-[95%] mx-auto mb-8 text-center outline-none"
          required
        />
      </div>
    </div>
  );
};

export default ChildrenAmbition;
