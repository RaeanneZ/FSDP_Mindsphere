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


export {
    programmeService
}