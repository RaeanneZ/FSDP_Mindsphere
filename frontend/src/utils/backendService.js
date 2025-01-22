import axios from "axios";
//import { getAllProgrammeTiers } from "../../../backend/models/programmeTier";

const isLocalhost = window.location.hostname === "localhost";
const apiUrl = isLocalhost
  ? "http://localhost:5000/api"
  : "http://100.97.230.39:5000/api"; // neil tailscale network // laptop: http://100.83.156.26:5000/api

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

  getRegisteredProgrammesByAccount: async (email) => {
    try {
      const response = await axios.get(
        `${apiUrl}/programmes/registered/${email}`
      );
      return response.data;
    } catch (err) {
      console.error(
        "BackendService: Error getting registered programmes by account: ",
        err
      );
      throw err;
    }
  },
};

// Payment methods
const paymentService = {
  makePayment: async (Email, Name) => {
    try {
      const paymentData = { email: Email, name: Name };
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
  clientSecret: async () => {
    try {
      const response = await axios.post(`${apiUrl}/stripe/payment`, {
        amount: 5000,
        currency: "sgd",
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting client secret: ", err);
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
      const response = await axios.get(`${apiUrl}/schedules/${SchedID}`);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting remaining slots: ", err);
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
      console.error("BackendService: Error getting all bookings: ", err);
      throw error;
    }
  },

  addBooking: async (
    CustName,
    CustContact,
    CustEmail,
    tierID,
    progID,
    ChildrenDetails,
    Diet,
    SchedID,
    NumSeats,
    SpecialReq,
    TotalCost
  ) => {
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
        quantity: NumSeats,
        totalCost: TotalCost,
      };

      const response = await axios.post(`${apiUrl}/bookings`, newBooking);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding new booking: ", err);
      throw err;
    }
  },

  deleteBooking: async (Email, BookingDate, TierID) => {
    try {
      const response = await axios.delete(`${apiUrl}/bookings`, {
        data: { Email, BookingDate, TierID },
      });
      return response.data;
    } catch (err) {
      return {
        success: false,
        message: "delete booking failed",
        error: err.response?.data,
      };
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
      return {
        success: false,
        message: "Login failed",
        error: err.response.data,
      };
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
      //return response.data;
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: "Sign-up failed",
        error: err.response.data,
      };
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
      const response = await axios.post(`${apiUrl}/addChild`, childData);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding child: ", err);
      throw err;
    }
  },

  updateChild: async (childData) => {
    try {
      if (!childData.GuardianEmail || !childData.Name) {
        throw new Error("GuardianEmail and Name are required");
      }

      // Update the endpoint to match the backend route
      const response = await axios.put(
        `${apiUrl}/children/updateChild`,
        childData
      );
      return response.data;
    } catch (err) {
      console.error("BackendService: Error updating child: ", err);
      return {
        success: false,
        message: "Update failed",
        error: err.response?.data || err.message,
      };
    }
  },

  getChildByEmail: async (email) => {
    try {
      email;
      const response = await axios.get(
        `${apiUrl}/getChildByEmail/${encodeURIComponent(email)}`
      );
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting child by email: ", err);
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

const formService = {
  addBusiness: async (
    Name,
    ContactNo,
    Email,
    exNumOfDays,
    groupSize,
    orgName,
    helpText,
    callbackRequest
  ) => {
    try {
      const newBusiness = {
        Name: Name,
        ContactNo: ContactNo,
        Email: Email,
        exNumOfDays: exNumOfDays,
        groupSize: groupSize,
        orgName: orgName,
        helpText: helpText,
        callbackRequest: callbackRequest,
      };

      const response = await axios.post(
        `${apiUrl}/business/addBusiness`,
        newBusiness
      );

      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding new business: ", err);
      return {
        success: false,
        message: "Adding business failed",
        error: err.response ? err.response.data : err.message,
      };
    }
  },

  addSurvey: async (email, howHear, expRating, feedbackText) => {
    try {
      const newSurvey = {
        email: email,
        howHear: howHear,
        expRating: expRating,
        feedbackText: feedbackText,
      };

      const response = await axios.post(
        `${apiUrl}/survey/newSurvey`,
        newSurvey
      );
      return response.data;
    } catch (err) {
      console.error("BackendService: Error adding new survey: ", err);
      return {
        success: false,
        message: "Adding survey failed",
        error: err.response ? err.response.data : err.message,
      };
    }
  },
};

const programmeFeedBackService = {
  getFeedbackByID: async (progID) => {
    try {
      const response = await axios.get(`${apiUrl}/progID/${progID}`);
      return response.data;
    } catch (err) {
      console.error("BackendService: Error getting feedback by ID: ", err);
      throw err;
    }
  },
};

const dashboardService = {
    getDashboardMetrics: async () => {
        try {
            const response = await axios.get(`${apiUrl}/dashboard-metrics`);
            return response.data;
        } catch (err) {
            console.error("BackendService: Error retrieving dashboard metrics: "),
            err
        };
        throw err;
    },

    updateBusinessEnquiry: async (status, BusinessID) => {
        try {
            const updateData = {
                status: status,
                BusinessID: BusinessID
            };

            const response = await axios.put(`${apiUrl}/business/updateStatus`, updateData);
            return response.data;
        } catch (err) {
            console.error("BackendService: Error updating business enquiry: ", err);
            return {
                success: false,
                message: "Updating business enquiry failed",
                error: err.response ? err.response.data : err.message,
            }
        }
    },

    sendBroadcastMessage: async (message) => {
        try {
            const sendData = {
                message: message
            };
    
            // Assuming your API URL for sending broadcast messages is '/whatsapp/sendBroadcast'
            const response = await axios.post(`${apiUrl}/whatsapp/send-broadcast`, sendData);
            
            return response.data;
        } catch (err) {
            console.error("BackendService: Error sending broadcast message: ", err);
            return {
                success: false,
                message: "Sending broadcast message failed",
                error: err.response ? err.response.data : err.message,
            };
        }
    }
    
}

export default {
    programmeService,
    progScheduleService,
    accountService,
    childrenService,
    bookingService,
    paymentService,
    newsletterService,
    formService,
    programmeFeedBackService,
    dashboardService
};
