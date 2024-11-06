const ProgrammeTier = require("../models/programmeTier")

const getAllProgrammeTiers = async (req, res) => {
    try {
        const programmeTiers = await ProgrammeTier.getAllProgrammeTiers();
        res.status(200).json(programmeTiers);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retreiving programme tiers");
    }
}

module.exports = {
    getAllProgrammeTiers
}