import axios from "axios";

const apiUrl = "http://localhost:5000/api";

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

// Payment methods
const paymentService = {
  makePayment: async (TransacID) => {
    try {
      const response = await axios.put(
        `${apiUrl}/payments/makePayment`,
        TransacID
      );
      return response.data;
    } catch (err) {
      console.error("Error making payment: ", err);
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

export default {
  programmeService,
  progScheduleService,
  accountService,
  bookingService,
  paymentService,
};
