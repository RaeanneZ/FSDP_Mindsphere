import axios from 'axios'

const apiUrl = 'http://localhost:5000/api'

// Programmes methods

const programmeService = {
    getAllProgrammes: async () => {
        try {
            const response = await axios.get(`${apiUrl}/programmes`);
            return response.data;
        } catch (err) {
            console.error('Error getting all programmes: ', err);
            throw error;
        }
    }
}

const progScheduleService = {
    getAllProgSchedules: async () => {
        try {
            const response = await axios.get(`${apiUrl}/schedules`);
            return response.data;
        } catch (err) {
            console.error('Error getting all schedules: ', err);
            throw error;
        }
    },

    addProgrammeSchedule: async (newSchedule) => {
        try {
          const response = await axios.post(`${apiUrl}/schedules`, newSchedule);
          return response.data;
        } catch (err) {
          console.error('Error adding new schedule: ', err);
          throw err;
        }
      }
}


export {
    programmeService,
    progScheduleService
}