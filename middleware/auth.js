const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(403).json({ msg: "Unauthorized access!" }).end();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.send("Authorization error!").end();
  }
};

const adminAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("nt");
    res.status(403).json({ msg: "Unauthorized access!" }).end();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.rol !== 1) {
      res.status(403).json({ msg: "Unauthorized access!" }).end();
      return;
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.send("Authorization error!").end();
  }
};

const postAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(403).json({ msg: "Unauthorized access!" }).end();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.rol === 0) {
      res
        .status(403)
        .json({ msg: "Admin must give you permision for post funcionality" })
        .end();
      return;
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.send("Authorization error!").end();
  }
};
module.exports = { auth, adminAuth, postAuth };
