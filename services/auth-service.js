const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../config/db");

class AuthService {
  static createToken(user) {
    const payload = {
      user: {
        id: user.id,
        rol: user.rol,
      },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
  }

  static async loginUsers(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User doesn't exist!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Error logging in!");
    }
    return this.createToken(user);
  }
}

module.exports = AuthService;
