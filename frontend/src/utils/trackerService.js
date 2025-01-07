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
    const response = await fetch(`${API_BASE_URL}/track/statistics`);
    return response.json();
  },
};

export default TrackerService;
