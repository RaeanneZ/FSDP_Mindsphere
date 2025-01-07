const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

const TrackerService = {
  incrementVisitorCount: async () => {
    const response = await fetch(`${API_BASE_URL}/track/visitor`, {
      method: "POST",
    });
    return response.json();
  },

  incrementProgrammeClick: async (programmeId) => {
    const response = await fetch(`${API_BASE_URL}/track/programme-click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ programmeId }),
    });
    return response.json();
  },

  getStatistics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/track/statistics`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse JSON only if the response is valid
    } catch (error) {
      console.error("Error in getStatistics:", error.message);
      return { visitors: 0, programmeClicks: {} }; // Return default values on error
    }
  },
};

export default TrackerService;
