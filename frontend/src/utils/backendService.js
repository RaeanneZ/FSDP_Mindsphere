import axios from "axios";
//import { getAllProgrammeTiers } from "../../../backend/models/programmeTier";

const apiUrl = "http://localhost:5000/api";

// Programmes methods

// programmeService.js
const programmeService = {
  getAllProgrammes: async () => {
    try {
      const response = await axios.get(`${apiUrl}/programmes`);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting all programmes: ", err);
      throw err;
    }
  },

  getAllProgrammeTiers: async () => {
    try {
      const response = await axios.get(`${apiUrl}/programmetiers`);
      return response.data;
    } catch (err) {
      console.error(
        "BackendService: Error retreiving all programme tiers",
        err
      );
      throw err;
    }
  },
  // Backend: getProgrammeByName(progName)
};

// Payment methods
const paymentService = {
  makePayment: async (Email) => {
    try {
      const paymentData = { email: Email };
      const response = await axios.put(
        `${apiUrl}/payments/makePayment`,
        paymentData
      );
      return response.data;
    } catch (err) {
      console.error("BackendService: Error making payment: ", err);
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
      console.error("BackendService: Error getting all schedules: ", err);
      throw error;
    }
  },

  addProgrammeSchedule: async (newSchedule) => {
    try {
      const response = await axios.post(`${apiUrl}/schedules`, newSchedule);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding new schedule: ", err);
      throw err;
    }
  },

  getRemainingSlots: async (SchedID) => {
    try {
      const body = {
        schedID: SchedID
      }
      const response = await axios.get()
    } catch (err) {
      console.error("BackendService: Error getting remaining slots: ", err)
      throw err
    }
  }
};

const bookingService = {
  getAllBookings: async () => {
    try {
      const response = await axios.get(`${apiUrl}/bookings`);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting all bookings: ", err);
      throw error;
    }
  },

  addBooking: async (CustName, CustContact, CustEmail, tierID, progID, ChildrenDetails, Diet, SchedID, NumSeats, SpecialReq) => {
    try {
      /* EXAMPLE BODY 
      {
        "custName": "John Doe",
        "custEmail": "johndoe@example.com",
        "custContact": "12345678",
        "TierID": 1,
        "ProgID": 2,
        "childrenDetails": [
            {
                "name": "Liam Gray",
                "dob": "2015-05-10",
                "gender": "M",
                "school": "Bright Future School",
                "needs": "None"
            },
            {
                "name": "Ava Smith",
                "dob": "2015-09-25",
                "gender": "F",
                "school": "Green Valley School",
                "needs": "None"
            }
        ],
        "diet": "Vegetarian",
        "schedID": 3,
        "numSeats": 2,
        "specialReq": "Wheelchair accessible",
        "TransacID": null
    } */
    
      const newBooking = {
        custName: CustName,
        custContact: CustContact,
        custEmail: CustEmail,
        TierID: tierID,
        ProgID: progID,
        childrenDetails: ChildrenDetails,
        diet: Diet,
        schedID: SchedID,
        numSeats: NumSeats,
        specialReq: SpecialReq,
        TransacID: null,
      }
    
      const response = await axios.post(`${apiUrl}/bookings`, newBooking);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding new booking: ", err);
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
      console.error("BackendService: Error getting all accounts: ", err);
      throw err;
    }
  },

  // Remove password from this, append the rest of the account info inside.
  // In account profile page, when user edit profile this will be called again
  registerAccount: async (accountData) => {
    try {
      const response = await axios.put(`${apiUrl}/register`, accountData);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error registering account: ", err);
      throw err;
    }
  },

  loginAccount: async (credentials) => {
    try {
      console.log("Credentials", credentials);
      const response = await axios.post(`${apiUrl}/login`, credentials);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error logging in: ", err);
      throw err;
    }
  },

  getAccountByEmail: async (email) => {
    try {
      const response = await axios.get(`${apiUrl}/account/${email}`);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting account by email: ", err);
      throw err;
    }
  },

  updateAccountByEmail: async (email, accountData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/account/${email}`,
        accountData
      );
      return response.data;
    } catch (err) {
      console.error("BackendService: Error updating account: ", err);
      throw err;
    }
  },

  retrieveAccountInfo: async (email) => {
    try {
      const response = await axios.get(`${apiUrl}/bookings/${email}`);
      return response.data;
    } catch (err) {
      console.error("Error retrieving account info: ", err);
    }
  },

  signUp: async (email, password, verifCode) => {
    try {
      const response = await axios.post(`${apiUrl}/signUp`, {
        email,
        password,
        verifCode,
      });
      return response.data;
    } catch (err) {
      console.error("Error signing up: ", err);
    }
  },

  // Backend: signup(email, password, verifCode) - Verify email and verification code. If successful, delete record from AccountVerification, then create an account record with just email and password
  // Backend: registerChild(GuardianEmail, Name, Gender, Dob, Needs, School, Interests)
  // Backend: getAccountByEmail(email) - Retrieve all info of member when logged in
};

//Children methods
const childrenService = {
  addChild: async (childData) => {
    try {
      const response = await axios.post(`${apiUrl}/addChild`, {
        ...childData,
      });
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding child: ", err);
      throw err;
    }
  },
};

const newsletterService = {
  getAllEmails: async () => {
    try {
      const response = await axios.get(`${apiUrl}/newsletter`);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error retrieving all emails: ", err);
      throw err;
    }
  },

  addEmailNewletter: async (email) => {
    try {
      const emailData = { Email: email };
      const response = await axios.post(`${apiUrl}/newsletter`, emailData);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding email to newsletter: ", err);
    }
  },
};

export default {
  programmeService,
  progScheduleService,
  accountService,
  childrenService,
  bookingService,
  paymentService,
  newsletterService,
};
