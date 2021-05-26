const express = require("express");
const { check } = require("express-validator");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();
const userController = require("../controllers/user-controller.js");

router.get("/", adminAuth, userController.getUsers);
router.get("/:id", auth, userController.getSingleUser);
router.delete("/:id", auth, userController.deleteUser);
router.get("/rol/:rol", adminAuth, userController.getUsersRol);
router.post(
  "/",
  [check("password", "Password is required").isLength({ min: 5 })],
  userController.addUser
);
router.put("/:id", auth, userController.updateUser);

module.exports = router;
