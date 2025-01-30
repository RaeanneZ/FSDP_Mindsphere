import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import { useNavigate } from "react-router-dom";
import backendService from "../utils/backendService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EmailAdmin = () => {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState("");
  const [owner, setOwner] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState("");
  const [recipients, setRecipients] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const { emailAdminService } = backendService;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await emailAdminService.getAllTemplates();
      setTemplates(response);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  const handlePreview = () => {
    setPreview(
      `To: Example Contact <example@google.com>\nSubject: ${subject}\n\nHi Example,\n\n${body}`
    );
  };

  const handleSaveTemplate = async () => {
    try {
      await emailAdminService.saveTemplate(name, subject, body);
      alert("Template saved successfully!");
      fetchTemplates();
    } catch (err) {
      console.error("Error saving template:", err);
    }
  };

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

  const handleSendEmail = async () => {
    try {
      await emailAdminService.sendCustomEmail(
        recipients.split(","),
        subject,
        body,
        attachments
      );
      alert("Email sent successfully!");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  const handleAttachmentChange = (e) => {
    setAttachments([...e.target.files]);
  };

  return (
    <div className="min-h-screen h-full bg-lightBlue">
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-darkBlue mb-6">
          Email Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Editor Section */}
          <Card className="rounded-xl">
            <CardContent>
              <h2 className="text-xl font-semibold text-darkGrey mb-4">
                Email Editor
              </h2>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Recipients</label>
                <Input
                  value={recipients}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setRecipients(e.target.value)}
                  placeholder="Enter recipient emails (comma-separated)"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Subject</label>
                <Input
                  value={subject}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Body</label>
                <Textarea
                  value={body}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setBody(e.target.value)}
                  rows="5"
                  placeholder="Enter email body"
                />
              </div>
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
                <Input
                  id="fileInput"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <Button
                onClick={handleSendEmail}
                className="bg-yellow text-white mt-8 w-full"
              >
                Send Email
              </Button>
            </CardContent>
          </Card>

          {/* Template Management Section */}
          <Card className="rounded-xl">
            <CardContent>
              <h2 className="text-xl font-semibold text-darkGrey mb-4">
                Template Management
              </h2>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Template Name</label>
                <Input
                  value={name}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Folder</label>
                <Input
                  value={folder}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setFolder(e.target.value)}
                  placeholder="Enter folder name"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Tags</label>
                <Input
                  value={tags}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-darkGrey">Owner</label>
                <Input
                  value={owner}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="Enter owner"
                />
              </div>
              <Button
                onClick={handleSaveTemplate}
                className="bg-yellow text-white mr-4"
              >
                Save Template
              </Button>
              <Button
                onClick={handlePreview}
                className="bg-lightYellow text-darkGrey"
              >
                Preview Template
              </Button>
            </CardContent>
          </Card>

          {/* Sending test email */}
          <Card className="col-span-2 rounded-xl">
            <CardContent>
              <h2 className="text-xl font-semibold text-darkGrey mb-4">
                Template Preview
              </h2>
              <pre className="bg-white p-4 rounded-md border border-gray-300 whitespace-pre-wrap">
                {preview || "Your email preview will appear here."}
              </pre>
              <Button
                onClick={() => alert("Sending test email...")}
                className="bg-yellow text-white mt-4"
              >
                Send Test Email To Me
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmailAdmin;
