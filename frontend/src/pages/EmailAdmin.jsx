import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, Card, CardContent } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import backendService from "../utils/backendService";
import Navbar from "../components/Navbar";

const EmailAdmin = () => {
  const [templates, setTemplates] = useState([]);
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setBody(template.body);
  };

  const handleAttachmentChange = (e) => {
    setAttachments([...e.target.files]);
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

  return (
    <div className="min-h-screen bg-lightBlue">
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-darkBlue mb-6">
          Admin Email Panel
        </h1>
        <Card>
          <CardContent>
            <div className="mb-4">
              <label className="text-darkGrey">
                Recipients (comma-separated)
              </label>
              <Input
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Enter recipient emails"
              />
            </div>
            <div className="mb-4">
              <label className="text-darkGrey">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div className="mb-4">
              <label className="text-darkGrey">Body</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="5"
                placeholder="Enter email content"
              />
            </div>
            <div className="mb-4">
              <label className="text-darkGrey">Attachments</label>
              <Input type="file" multiple onChange={handleAttachmentChange} />
            </div>
            <Button onClick={handleSendEmail} className="bg-yellow text-white">
              Send Email
            </Button>
          </CardContent>
        </Card>
        <h2 className="text-2xl font-semibold text-darkBlue mt-10">
          Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent>
                <h3 className="text-xl font-bold text-darkGrey">
                  {template.name}
                </h3>
                <p className="text-darkGrey">{template.subject}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailAdmin;
