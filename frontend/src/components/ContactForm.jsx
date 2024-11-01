// ContactForm.jsx
import React from "react";

const ContactForm = ({ contactInfo, setContactInfo }) => (
  <div className="mb-6">
    <h4 className="font-semibold text-lg mb-2">Contact Information</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Name"
        value={contactInfo.name}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, name: e.target.value })
        }
        className="w-full border rounded px-3 py-2 sm:py-3"
      />
      <input
        type="text"
        placeholder="Contact No."
        value={contactInfo.contactNo}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, contactNo: e.target.value })
        }
        className="w-full border rounded px-3 py-2 sm:py-3"
      />
      <input
        type="email"
        placeholder="Email"
        value={contactInfo.email}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, email: e.target.value })
        }
        className="col-span-1 sm:col-span-2 border rounded px-3 py-2 sm:py-3"
      />
    </div>
  </div>
);

export default ContactForm;