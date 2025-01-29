import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backendService from "../utils/backendService";
import { introBg } from "../utils";

const AdminB2BManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [businessOptions, setBusinessOptions] = useState([]);
  const [selectedBusinessID, setSelectedBusinessID] = useState();
  const [tag, setTag] = useState("Incomplete");
  const [text, setText] = useState("");
  const { dashboardService } = backendService;

  useEffect(() => {
    const fetchBusinessEnquiries = async () => {
      try {
        const businesses = await dashboardService.getBusinessEnquiries();
        setBusinessOptions(businesses);
      } catch (error) {
        console.error("Error fetching business enquiries:", error);
      }
    };
    fetchBusinessEnquiries();
  }, []);

  console.log(businessOptions);

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedBusinessID) {
      alert("Please select a business before submitting!");
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      console.log(selectedBusinessID);
      await dashboardService.addEnquiryTimeline(
        formData,
        selectedBusinessID,
        text,
        tag
      );
      alert("Enquiry submitted successfully!");
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Error submitting enquiry. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="bg-cover flex justify-center items-center"
        style={{ backgroundImage: `url(${introBg})` }}
      >
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">B2B Enquiries</h1>
          {/* This is to target Business */}
          <div>
            <label className="block text-sm font-medium">Business Name</label>
            <select
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              onChange={(e) => setSelectedBusinessID(e.target.value)}
              value={selectedBusinessID}
            >
              <option>Select Business</option>
              {businessOptions.map((business) => (
                <option key={business.BusinessID} value={business.BusinessID}>
                  {business.orgName}
                </option>
              ))}
            </select>
          </div>

          {/* Documents relating to the Business */}
          <div className="pt-6">
            <h2 className="text-lg font-semibold">Current Documents</h2>
            <div className="flex space-x-4 mt-3">
              {["Client Enquiry", "Proposal", "Payment Form"].map(
                (doc, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-4 bg-gray-100 rounded-md shadow hover:shadow-lg transition"
                  >
                    <p className="font-medium">{doc}</p>
                    <a href="#" className="text-blue-600 hover:underline">
                      View Document Here
                    </a>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Upload document for business */}
          <div className="py-6">
            <h2 className="text-lg font-semibold">Upload Document</h2>
            {/* This is for the tag */}
            <select
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>

            {/* This is for the text */}
            <select
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              value={text}
              onChange={(e) => setText(e.target.value)}
            >
              <option>Document Name</option>
              <option>Enquiry</option>
              <option>Proposal Draft</option>
              <option>Final Proposal</option>
              <option>Payment Form</option>
            </select>

            {/* This is for the upload document */}
            <div
              className={`mt-4 p-6 border-2  bg-lightBlue ${
                dragActive
                  ? "border-darkBlue bg-lightBlue"
                  : "border-gray-300 border-dashed"
              } rounded-md flex flex-col items-center justify-center`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <p className="text-gray-600">
                {selectedFile
                  ? `Selected File: ${selectedFile.name}`
                  : "Upload your document here"}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-darkBlue text-white rounded-md"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Choose File
              </button>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow text-white p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminB2BManagement;
