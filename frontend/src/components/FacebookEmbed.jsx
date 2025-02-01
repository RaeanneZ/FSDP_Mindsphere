import React, { useEffect } from "react";

const FacebookEmbed = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v22.0";
        script.onload = () => {
            if (window.FB) {
                window.FB.XFBML.parse();
            }
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "left", marginBottom: "10px", fontSize: "40px", fontWeight: "bold" }}>Facebook Feed</h1>
            <hr></hr>
            <div
                style = {{marginTop:"10px"}}
                className="fb-page"
                data-href="https://www.facebook.com/p/Mindsphere-Singapore-61562453783240/"
                data-tabs="timeline"
                data-width="504px" 
                data-height="991px"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
            >
                <blockquote
                    cite="https://www.facebook.com/p/Mindsphere-Singapore-61562453783240/"
                    className="fb-xfbml-parse-ignore"
                >
                    <a href="https://www.facebook.com/p/Mindsphere-Singapore-61562453783240/">
                        Mindsphere Singapore
                    </a>
                </blockquote>
            </div>
        </div>
    );
};

export default FacebookEmbed;
