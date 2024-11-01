const Children = require("../models/children");

const addChild = async (req, res) => {
  const { GuardianEmail, Name, Gender, Dob, Needs, School, Interests } =
    req.body;

  console.log("Request Body:", req.body);
  try {
    const newChild = await Children.addChild({
      GuardianEmail,
      Name,
      Gender,
      Dob,
      Needs,
      School,
      Interests,
    });
    res
      .status(201)
      .json({ message: "Child added successfully", child: newChild });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { addChild };
