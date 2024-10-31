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

module.exports = {
    getAllProgSchedules
}