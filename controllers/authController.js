const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Please provide all fields.");
  }

  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).send("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const student = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: student._id }, "543216789", { expiresIn: "1h" });

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let student = await Student.findOne({ email });
  if (!student) {
    return res.status(400).send("Invalid Data Input.");
  }

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) {
    return res.status(400).send("Invalid Data Input.");
  }

  const token = jwt.sign({ id: student._id }, "543216789", { expiresIn: "1h" });

  res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not authorized to perform this operation." });
  }

  token = token.split(" ")[1];

  try {
    let student = jwt.verify(token, "543216789");
    req.student = student.id;
    return next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid token, verify you are not a robot" });
  }
  next();
};

module.exports = {
  register,
  login,
  verifyToken,
};
