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

  // Backend: getProgrammeByName(progName)
};

// Payment methods
const paymentService = {
  // Frontend provides email -  backend has to grab the corresponding email and TransacStatus = Pending
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

  // Frontend provides custName, custContact, custEmail, programmeName, childrenDetails (in Array), diet, startDate, endDate, numSeats, specialReq
  addBooking: async (newBooking) => {
    try {
      const response = await axios.post(`${apiUrl}/bookings`, newBooking);
      return response.data;
    } catch (err) {
      console.error("Error adding new booking: ", err);
      throw err;
    }
  },

  // Backend: getBookingByEmail(email) - This is for the account profile
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

  // Remove password from this, append the rest of the account info inside.
  // In account profile page, when user edit profile this will be called again
  registerAccount: async (accountData) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, accountData);
      return response.data;
    } catch (err) {
      console.error("Error registering account: ", err);
      throw err;
    }
  },
  // Error fetching programmes: AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}
  loginAccount: async (credentials) => {
    try {
      const response = await axios.post(`${apiUrl}/account/login`, credentials);
      return response.data;
    } catch (err) {
      console.error("Error logging in: ", err);
      throw err;
    }
  },
  // Backend: signup(email, password, verifCode) - Verify email and verification code. If successful, delete record from AccountVerification, then create an account record with just email and password
  // Backend: registerChild(GuardianEmail, Name, Gender, Dob, Needs, School, Interests)
  // Backend: getAccountByEmail(email) - Retrieve all info of member when logged in
};

export default {
  programmeService,
  progScheduleService,
  accountService,
  bookingService,
  paymentService,
};
