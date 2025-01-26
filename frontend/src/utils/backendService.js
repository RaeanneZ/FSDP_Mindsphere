import axios from "axios";
// import { createAccount } from "../../../backend/models/account";
// import { getAllProgrammeTiers } from "../../../backend/models/programmeTier";

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
            console.error(
                "BackendService: Error getting all programmes: ",
                err
            );
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

const emailAdminService = {
    // Create or update an email template
    saveTemplate: async (name, subject, body) => {
        try {
            const response = await axios.post(`${apiUrl}/emails/templates`, {
                name,
                subject,
                body,
            });
            return response.data;
        } catch (err) {
            console.error("BackendService: Error saving template: ", err);
            throw err;
        }
    },

    // Get all saved email templates
    getAllTemplates: async () => {
        try {
            const response = await axios.get(`${apiUrl}/emails/templates`);
            return response.data;
        } catch (err) {
            console.error("BackendService: Error fetching templates: ", err);
            throw err;
        }
    },

    // Delete an email template by ID
    deleteTemplate: async (templateID) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/emails/templates/${templateID}`
            );
            return response.data;
        } catch (err) {
            console.error("BackendService: Error deleting template: ", err);
            throw err;
        }
    },

    // Save a draft email
    saveDraft: async (subject, body, createdBy) => {
        try {
            const response = await axios.post(`${apiUrl}/emails/save-draft`, {
                subject,
                body,
                createdBy,
            });
            return response.data;
        } catch (err) {
            console.error("BackendService: Error saving draft: ", err);
            throw err;
        }
    },

    // Send a custom email to multiple recipients
    sendCustomEmail: async (recipients, subject, body, attachments) => {
        try {
            const formData = new FormData();
            formData.append("subject", subject);
            formData.append("body", body);
            formData.append("recipients", recipients.join(","));

            if (attachments) {
                attachments.forEach((file) => {
                    formData.append("attachments", file);
                });
            }

            const response = await axios.post(
                `${apiUrl}/emails/send`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return response.data;
        } catch (err) {
            console.error("BackendService: Error sending custom email: ", err);
            throw err;
        }
    },

    // Schedule an email for a future date and time
    scheduleEmail: async (emailData, scheduleTime) => {
        try {
            const response = await axios.post(`${apiUrl}/emails/schedule`, {
                ...emailData,
                scheduleTime,
            });
            return response.data;
        } catch (err) {
            console.error("BackendService: Error scheduling email: ", err);
            throw err;
        }
    },

    // Get logs of sent emails
    getEmailLogs: async () => {
        try {
            const response = await axios.get(`${apiUrl}/emails/logs`);
            return response.data;
        } catch (err) {
            console.error("BackendService: Error retrieving email logs: ", err);
            throw err;
        }
    },

    sendEmailWithAttachment: async (recipients, subject, body, attachments) => {
        try {
            const formData = new FormData();

            // Recipients should be an array of email addresses
            if (Array.isArray(recipients)) {
                formData.append("to", recipients.join(",")); // Convert array to a comma-separated string
            } else {
                formData.append("to", recipients); // Single recipient as a string
            }

            formData.append("subject", subject);
            formData.append("body", body);

            if (attachments && attachments.length) {
                attachments.forEach((file) => {
                    formData.append("attachments", file);
                });
            }

            const response = await axios.post(
                `${apiUrl}/emails/send-with-attachment`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            return response.data;
        } catch (err) {
            console.error(
                "BackendService: Error sending email with attachment: ",
                err
            );
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
            const response = await axios.post(
                `${apiUrl}/schedules`,
                newSchedule
            );
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
            console.error(
                "BackendService: Error getting remaining slots: ",
                err
            );
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

  
  // signUp: async (email, password, verifCode) => {
  //     try {
  //         const response = await axios.post(`${apiUrl}/signUp`, {
  //             email,
  //             password,
  //             verifCode,
  //         });
  //         //return response.data;
  //         return {
  //             success: true,
  //         };
  //     } catch (err) {
  //         return {
  //             success: false,
  //             message: "Sign-up failed",
  //             error: err.response.data,
  //         };
  //     }
  // },

  createAccount: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/account/createAccount`, {
        email,
        password,
      });
      return {
        success: true,
        message:
          "Account created successfully. Please check your email for verification.",
      }
    } catch (err) {
      return {
      success: false,
      message: "Sign-up failed",
        error: err.response.data,
      };
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
        message: "Account creation failed",
        error: err.response?.data,
      };
    }
  },

  verifyEmail: async (email, verificationCode) => {
    try {
      const response = await axios.post(`${apiUrl}/account/verifyEmail`, {
        email,
        verifCode: verificationCode,
      });
      return {
        success: true,
        message: "Email verified successfully.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Email verification failed",
        error: err.response?.data,
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
            console.error(
                "BackendService: Error getting child by email: ",
                err
            );
            throw err;
        }
    },
};


const meetingService = {
  createMeeting: async (meetingData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/whereby/create`,
        meetingData
      );
      return response.data;
    } catch (err) {
      console.error("Error creating meeting: ", err);
      throw err;
    }
  },
  getAllMeetings: async () => {
    try {
      const response = await axios.get(`${apiUrl}/whereby/all`);
      return response.data;
    } catch (err) {
      console.error("Error fetching all meetings: ", err);
      throw err;
    }
  },
  getMeetingDetails: async (meetingId) => {
    try {
      const response = await axios.get(`${apiUrl}/whereby/${meetingId}`);
      console.log(response);
      return response.data; // Fetch meeting details from backend
    } catch (err) {
      console.error("Error fetching meeting details:", err);
      throw err;
    }

    // Response is:
    //     EndTime: "2025-01-22T06:00:00.000Z"
    //     HostRoomURL: "https://mindsphere-online.whereby.com/8debaa42-8338-434e-9198-be6bd5c0b210?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI5NTY1ODIxMiIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvOGRlYmFhNDItODMzOC00MzRlLTkxOTgtYmU2YmQ1YzBiMjEwIiwib3JnYW5pemF0aW9uSWQiOiIzMDY0MjkifSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zcnYud2hlcmVieS5jb20iLCJpYXQiOjE3MzcyNjY2OTQsInJvb21LZXlUeXBlIjoibWVldGluZ0hvc3QifQ.QFNF8qjihoiEJbVKWq1KrWpqX6tbXTchjoGVQBibu_g"
    //     IsLocked: true
    //     MeetingID:"95658212"
    //     RoomURL: "https://mindsphere-online.whereby.com/8debaa42-8338-434e-9198-be6bd5c0b210"
    //     StartTime: "2025-01-22T03:00:00.000Z"
    //     UserEmail: "raeannezou@gmail.com"
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
            const response = await axios.get(`${apiUrl}/adminDashboard`);
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
    },
    
    addEnquiryTimeline: async (formData, BusinessID, Text, Tag) => {
    try {
      formData.append("BusinessID", BusinessID);
      formData.append("Text", Text);
      formData.append("Tag", Tag)

        const response = await axios.post(`${apiUrl}/adminDashboard/uploadEnquiryTimeline`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            success: false,
            message: "File upload failed",
            error: error.response ? error.response.data : error.message,
        };
    }
    },

    retrieveEnquiryTimeline: async (BusinessID) => {
      try {
          const response = await axios.get(`${apiUrl}/timelines/${BusinessID}`);
          
          return response.data;
      } catch (error) {
          console.error("Error retrieving timelines:", error);
          return {
              success: false,
              message: "Failed to retrieve timelines",
              error: error.response ? error.response.data : error.message,
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
    dashboardService,
    emailAdminService,
    meetingService
};
