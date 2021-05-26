const { validationResult } = require("express-validator");
const UserService = require("../services/user-service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validateOwner = (userId, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.user.id === userId || decoded.user.rol === 1;
};

const addUser = async (req, res) => {
  const user = req.body;
  if (!user.email) {
    res.status(404).send("Email can not be empty!").end();
    return;
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const newUser = await UserService.addUser(user);

      res.status(201).send(newUser);
    } catch (e) {
      res.status(500).send(e.message).end();
      console.log(e);
    }
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.send(users).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const getUsersRol = async (req, res) => {
  try {
    const users = await UserService.getUsersRol(req.params.rol);
    res.send(users).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  const token = req.header("x-auth-token");
  try {
    bcrypt.hash(newUser.password, 10).then(async (hash) => {
      newUser.password = hash;
    });
    const user = await UserService.getSingleUser(id);
    if (!user) {
      res.status(404).send({ message: "User doesn't exist!" }).end();
    }
    if (validateOwner(user.userId, token)) {
      await UserService.updateUser(id, newUser);
      const editedUser = await UserService.getSingleUser(id);
      res.send(editedUser).end();
    } else {
      res
        .status(403)
        .send({ message: "You are not owner of this user!" })
        .end();
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await UserService.getSingleUser(req.params.id);
    if (!user) {
      res.status(404).send({ message: "User not found!" }).end();
      return;
    }
    res.send(user).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) {
      res.status(404).send({ message: "User not found!" }).end();
      return;
    }
    res.send({ message: "User is deleted!" }).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

module.exports = {
  addUser,
  getUsers,
  updateUser,
  getSingleUser,
  deleteUser,
  getUsersRol,
};
