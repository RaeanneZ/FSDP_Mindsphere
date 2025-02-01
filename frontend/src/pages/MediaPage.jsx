import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ActionButtons from "../components/ActionButtons";
import Footer from "../components/Footer";
import FacebookEmbed from "../components/FacebookEmbed";
import LinkedInEmbed from "../components/LinkedInEmbed";

const MediaPage = () => {
    return (
        <>
            <Navbar />
            
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "20px", 
                padding: "20px", 
                maxWidth: "1200px", 
                margin: "0 auto"
            }}>
                <div style={{ width: "48%" }}>
                    <FacebookEmbed />
                </div>
                <div style={{ width: "48%" }}>
                    <LinkedInEmbed />
                </div>
            </div>
            
            <ActionButtons />
            <Footer />
        </>
    );
};

export default MediaPage;
