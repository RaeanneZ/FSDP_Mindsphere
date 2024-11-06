const Programmes = require("../models/programmes")

const getAllProgrammes = async (req, res) => {
    try {
        const programmes = await Programmes.getAllProgrammes();
        res.status(200).json(programmes);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retreiving programmes");
    }
}

module.exports = {
    getAllProgrammes
}