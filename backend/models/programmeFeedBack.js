const sql = require("mssql");
const dbConfig = require("../dbConfig");

class ProgrammeFeedback {
  //attributes
  constructor(FeedbackID, ProgID, AccID, FdbkDesc) {
    this.FeedbackID = FeedbackID;
    this.ProgID = ProgID;
    this.AccID = AccID;
    this.FdbkDesc = FdbkDesc;
  }

  //methods
}

module.exports = ProgrammeFeedback;
