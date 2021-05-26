const AuthService = require('../services/auth-service');
const UserService = require('../services/user-service');

const register = async (req, res) => {
  const user = req.body;
  if (!user.email) {
    res
      .status(404)
      .send({
        message: 'Email can not be empty!',
      })
      .end();
    return;
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const newUser = await UserService.addUser(user);
    const token = AuthService.createToken(user);
    res.status(201).send({ token });
  } catch (e) {
    res.status(500).send({ message: e.message }).end();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    try {
      const token = await AuthService.loginUsers(email, password);
      res.status(200).send({ token }).end();
    } catch (err) {
      res.status(404).send(err.message);
    }
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
};
