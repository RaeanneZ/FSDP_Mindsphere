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
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [preview, setPreview] = useState("");
    const [recipients, setRecipients] = useState("");
    const [attachments, setAttachments] = useState([]);
    const navigate = useNavigate();

    const { emailAdminService } = backendService;

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await emailAdminService.getAllTemplates();
            setTemplates(Array.isArray(response) ? response : []);
        } catch (err) {
            console.error("Error fetching templates:", err);
        }
    };

    const handleTemplateSelect = (templateID) => {
        const selected = templates.find(
            (t) => t.TemplateID.toString() === templateID
        );
        if (selected) {
            setSubject(selected.Subject || "");
            setBody(selected.Body || "");
        }
        setSelectedTemplate(templateID);
    };

    const handlePreview = () => {
        setPreview(`To: ${recipients}\nSubject: ${subject}\n\n${body}`);
    };

    const handleSaveTemplate = async () => {
        try {
            await emailAdminService.saveTemplate(name, subject, body, tags);
            alert("Template saved successfully!");
            fetchTemplates();
        } catch (err) {
            console.error("Error saving template:", err);
        }
    };

    const handleSendEmail = async () => {
        if (!recipients.trim() || !subject.trim() || !body.trim()) {
            alert("All fields are required.");
            return;
        }

        const recipientList = recipients
            .split(",")
            .map((email) => email.trim());

        try {
            if (attachments.length > 0) {
                await emailAdminService.sendEmailWithAttachment(
                    recipientList,
                    subject,
                    body,
                    attachments
                );
            } else {
                await emailAdminService.sendCustomEmail(
                    recipientList,
                    subject,
                    body
                );
            }
            alert("Email sent successfully!");
        } catch (err) {
            alert("Failed to send email.");
            console.error("Error sending email:", err);
        }
    };

    return (
        <div className="min-h-screen h-full bg-lightBlue">
            <Navbar />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold text-darkBlue mb-6">
                    Email Management
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="rounded-xl shadow-md p-4">
                        <CardContent>
                            <h2 className="text-xl font-semibold text-darkGrey mb-4">
                                Email Editor
                            </h2>
                            <div className="mb-4 flex flex-col">
                                <label className="text-darkGrey">
                                    Select Template
                                </label>
                                <select
                                    onChange={(e) =>
                                        handleTemplateSelect(e.target.value)
                                    }
                                    value={selectedTemplate}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
                                >
                                    <option value="">Select a template</option>
                                    {templates.map((template) => (
                                        <option
                                            key={template.TemplateID}
                                            value={template.TemplateID}
                                        >
                                            {template.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                placeholder="Recipients"
                                value={recipients}
                                onChange={(e) => setRecipients(e.target.value)}
                                className="mb-4"
                            />
                            <Input
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="mb-4"
                            />
                            <Textarea
                                placeholder="Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow mb-4"
                            />
                            <input
                                type="file"
                                multiple
                                onChange={(e) =>
                                    setAttachments([...e.target.files])
                                }
                                className="mb-4"
                            />

                            <Button
                                onClick={handleSendEmail}
                                className="bg-yellow text-white mt-6 w-full"
                            >
                                Send Email
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-xl shadow-md p-4">
                        <CardContent>
                            <h2 className="text-xl font-semibold text-darkGrey mb-4">
                                Template Management
                            </h2>
                            <div className="flex flex-col mb-4">
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter template name"
                                    className="mb-2"
                                />
                                <Input
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Enter tags (comma-separated)"
                                />
                            </div>
                            <Button
                                onClick={handleSaveTemplate}
                                className="bg-yellow text-white w-full"
                            >
                                Save Template
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-2 rounded-xl shadow-md mt-6 p-4">
                    <CardContent>
                        <h2 className="text-xl font-semibold text-darkGrey mb-4">
                            Template Preview
                        </h2>
                        <pre className="bg-white p-4 rounded-md border border-gray-300 whitespace-pre-wrap">
                            {preview || "Your email preview will appear here."}
                        </pre>
                        <Button
                            onClick={handlePreview}
                            className="bg-lightYellow text-darkGrey mt-4"
                        >
                            Preview Email
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default EmailAdmin;
