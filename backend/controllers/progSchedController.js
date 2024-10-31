const ProgrammeSchedule = require("../models/programmeSchedule");
const dbConfig = require("../dbConfig");
const sql = require("mssql");

const getAllProgSchedules = async (req, res) => {
    try {
        const programmeSchedule = await ProgrammeSchedule.getAllProgSchedules();
        res.status(200).json(programmeSchedule);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving Programme Scehedules")
    }
}


const addProgrammeSchedule = async (req, res) => {
    try {
        const newSchedule = req.body;
        
        const duplicateExists = await ProgrammeSchedule.checkIfSchedIDExists(newSchedule.SchedID);
        
        if (duplicateExists) {
            return res.status(409).json({ error: "Programme Schedule with this SchedID already exists." });
        }
        
        await ProgrammeSchedule.addProgrammeSchedule(newSchedule);
        res.status(201).send("Programme Schedule added successfully");
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding Programme Schedule");
    }
};


module.exports = {
    getAllProgSchedules,
    addProgrammeSchedule
}