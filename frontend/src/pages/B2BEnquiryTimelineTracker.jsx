import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Timeline from "../components/Timeline";
import backendService from "../utils/backendService";

const templateTimelineData = [
  {
    Text: "Enquiry",
    createdDate: "To Be Added",
    Tag: "Incomplete",
  },
  {
    Text: "Proposal Draft",
    createdDate: "To Be Added",
    Tag: "Incomplete",
  },
  {
    Text: "Finalized Proposal",
    createdDate: "To Be Added",
    Tag: "Incomplete",
  },
  {
    Text: "Payment Form",
    createdDate: "To Be Added",
    Tag: "Incomplete",
  },
];

const { dashboardService } = backendService;

const B2BEnquiryTimelineTracker = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get("business");

  const [businessName, setBusinessName] = useState("Business");
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!businessId) {
      setError("Missing businessId in query parameters.");
      setLoading(false);
      return;
    }

    const fetchBusinessName = async () => {
      try {
        const response = await dashboardService.getBusinessEnquiries();
        console.log(response);

        if (response) {
          const business = response.find(
            (b) => b.BusinessID === Number(businessId)
          );
          setBusinessName(business ? business.orgName : "Unknown Business");
        }
      } catch (err) {
        setBusinessName("Business");
      }
    };

    const fetchTimelineData = async () => {
      try {
        const response = await dashboardService.retrieveEnquiryTimeline(
          businessId
        );
        console.log("Response: ", response);

        if (response.success && response.data.length > 0) {
          // Merge backend data with template to maintain the order
          const mergedData = templateTimelineData.map((templateItem) => {
            const matchedItem = response.data.find(
              (item) => item.Text === templateItem.Text
            );
            return matchedItem ? matchedItem : templateItem;
          });

          setTimelineData(mergedData);
        }
      } catch (err) {
        setError("Failed to fetch timeline data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessName();
    fetchTimelineData();
  }, [businessId]);

  if (loading) return <p>Loading timeline...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="flex flex-col my-10 w-full">
        <h1 className="text-3xl font-bold mb-4 w-full text-center">
          {businessName}
        </h1>
        <sub className="text-md font-semibold text-darkGrey w-full text-center">
          Here is a clear timeline of the process for reference. Please refer to
          the document sent to you by our staff for the formal documents
        </sub>
      </div>

      <div className="timeline-container p-4">
        {timelineData.length > 0 ? (
          timelineData.map((data, idx) => (
            <Timeline
              data={data}
              key={idx}
              className={
                timelineData.includes(data.Text)
                  ? "bg-lightBlue"
                  : "bg-gray-200"
              }
            />
          ))
        ) : (
          <p>No timeline records found.</p>
        )}
      </div>
    </>
  );
};

export default B2BEnquiryTimelineTracker;
