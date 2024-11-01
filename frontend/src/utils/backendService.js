import axios from "axios";

const apiUrl = "http://localhost:5000/api";

// Programmes methods

const programmeService = {
  getAllProgrammes: async () => {
    try {
      const response = await axios.get(`${apiUrl}/programmes`);
      return response.data;
    } catch (err) {
      console.error("Error getting all programmes: ", err);
      throw error;
    }
  },
};

const progScheduleService = {
  getAllProgSchedules: async () => {
    try {
      const response = await axios.get(`${apiUrl}/schedules`);
      return response.data;
    } catch (err) {
      console.error("Error getting all schedules: ", err);
      throw error;
    }
  },

  addProgrammeSchedule: async (newSchedule) => {
    try {
      const response = await axios.post(`${apiUrl}/schedules`, newSchedule);
      return response.data;
    } catch (err) {
      console.error("Error adding new schedule: ", err);
      throw err;
    }
  },
};

//Account Methods
const accountService = {
  getAllAccounts: async () => {
    try {
      const response = await axios.get(`${apiUrl}/account`);
      return response.data;
    } catch (err) {
      console.error("Error getting all accounts: ", err);
      throw err;
    }
  },

  registerAccount: async (accountData) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, accountData);
      return response.data;
    } catch (err) {
      console.error("Error registering account: ", err);
      throw err;
    }
  },

  loginAccount: async (credentials) => {
    try {
      const response = await axios.post(`${apiUrl}/account/login`, credentials);
      return response.data;
    } catch (err) {
      console.error("Error logging in: ", err);
      throw err;
    }
  },
};

export default { programmeService, progScheduleService, accountService };
