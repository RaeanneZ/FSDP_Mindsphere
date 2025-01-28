import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backendService from "../utils/backendService";
import { introBg } from "../utils";

const AdminB2BManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { dashboardService } = backendService;

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

  const handleSubmit = () => {
    if (selectedFile) {
      // Send the file to the backend using a POST request.
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Put it to the backend
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file before submitting!");
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
            <select className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow">
              <option>Select Business</option>
              <option>Business A</option>
              <option>Business B</option>
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
            <select className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow">
              <option>Document Name</option>
              <option>Enquiry</option>
              <option>Proposal Draft</option>
              <option>Final Proposal</option>
              <option>Payment Form</option>
            </select>
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
