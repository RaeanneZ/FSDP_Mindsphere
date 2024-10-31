const ProgrammeFeedback = require("../models/programmeFeedBack");

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await ProgrammeFeedback.getAllFeedback();
    res.status(200).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllFeedback, 
};
