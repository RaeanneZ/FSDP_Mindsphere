import React from "react";

const LinkedInEmbed = () => {
    return (
        <div>
            <h1 style={{ textAlign: "left", marginBottom: "10px", fontSize: "40px", fontWeight: "bold" }}>Latest LinkedIn Post</h1>
            <hr></hr>
            <iframe 
    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7265373172147859457" 
    height="991" 
    width="504" 
    allowFullScreen 
    title="Embedded post" 
></iframe>
        </div>
    );
};

export default LinkedInEmbed;
