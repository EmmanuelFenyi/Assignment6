const router = require("express").Router();
const studentController = require("../controllers/studentController");
const { verifyToken } = require("../controllers/authController");

router.get("/", studentController.getAllStudents);
router.get("/:id", verifyToken, studentController.getSingleStudent);

router.patch("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
