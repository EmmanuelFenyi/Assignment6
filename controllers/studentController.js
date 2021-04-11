const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json({ students });
};

const getSingleStudent = async (req, res) => {
  // if (!req.user) {
  //   return res
  //     .status(401)
  //     .json({ message: "You are not authorized to perform this operation" });
  // }
  const { id } = req.params;
  const student = await Student.findById(id);
  res.status(200).json({ student });
};


const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ student });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.status(200).json({ message: "Student profile deleted successfully!" });
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
