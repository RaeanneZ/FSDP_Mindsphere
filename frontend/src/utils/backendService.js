import axios from "axios";

const apiUrl = "http://localhost:5000/api";
console.log("API URL:", apiUrl);

// Programmes methods

// programmeService.js
const programmeService = {
  getAllProgrammes: async () => {
    try {
      const response = await axios.get(`${apiUrl}/programmes`);
      return response.data;
    } catch (err) {
      console.error("Error getting all programmes: ", err);
      throw err;
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

const bookingService = {
  getAllBookings: async () => {
    try {
      const response = await axios.get(`${apiUrl}/bookings`);
      return response.data;
    } catch (err) {
      console.error("Error getting all bookings: ", err);
      throw error;
    }
  },

  addBooking: async (newBooking) => {
    try {
      const response = await axios.post(`${apiUrl}/bookings`, newBooking);
      return response.data;
    } catch (err) {
      console.error("Error adding new booking: ", err);
      throw err;
    }
  },
};

export default {
  programmeService,
  progScheduleService,
  bookingService,
};
