const ProgrammeSchedule = require("../models/programmeSchedule");
const dbConfig = require("../dbConfig");
const sql = require("mssql");
const programmeSchedule = require("../models/programmeSchedule");

const getAllProgSchedules = async (req, res) => {
    try {
        const programmeSchedule = await ProgrammeSchedule.getAllProgSchedules();
        res.status(200).json(programmeSchedule);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retrieving Programme Scehedules")
    }
}


const addProgrammeSchedule = async (req, res) => {
    try {
        const newSchedule = req.body;
        
        //const duplicateExists = await ProgrammeSchedule.checkIfSchedIDExists(newSchedule.SchedID);
        
        //if (duplicateExists) {
          //  return res.status(409).json({ error: "Programme Schedule with this SchedID already exists." });
        //}
        
        await ProgrammeSchedule.addProgrammeSchedule(newSchedule);
        res.status(201).send("Programme Schedule added successfully");
        
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error adding Programme Schedule");
    }
};

const getRemainingSlots = async (req, res) => {
    try {
        const remainingSlots = await programmeSchedule.getRemainingSlots(req.params.schedID);
        res.status(200).json(remainingSlots);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retrieving remaing schedule slots");
    }
}


module.exports = {
    getAllProgSchedules,
    addProgrammeSchedule,
    getRemainingSlots
}