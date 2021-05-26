const bcrypt = require("bcryptjs");
const { User } = require("../config/db");

class UserService {
  static async addUser(user) {
    const usr = await User.findOne({ where: { email: user.email } });
    if (usr) throw Error("User exists!");

    return bcrypt.hash(user.password, 10).then(async (hash) => {
      user.password = hash;
      return User.create(user).catch((err3) => {
        throw err3.message || "Error creating new user!";
      });
    });
  }

  static async getUsers() {
    return User.findAll({}).catch((err) => {
      throw err || "Error retrieving users!";
    });
  }

  static async updateUser(id, user) {
    return User.update(
      { ...user },
      {
        where: {
          id,
        },
      }
    ).catch((err) => {
      throw err.message || "Error updating user!";
    });
  }

  static async getSingleUser(id) {
    return User.findOne({
      where: { id },
    }).catch((err) => {
      throw err || "Error updating users!";
    });
  }

  static async getUsersRol(rol) {
    return User.findAll({
      where: { rol },
    }).catch((err) => {
      throw err || "Error updating users!";
    });
  }

  static async deleteUser(id) {
    return User.destroy({ where: { id } }).catch((err) => {
      throw err || "Error updating users!";
    });
  }
}
module.exports = UserService;
