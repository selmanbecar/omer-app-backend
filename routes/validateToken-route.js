const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/validate", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(403).send({ message: "Token is not ok" });
    } else res.status(200).send({ message: "Token is ok" }); // bar
  });
});

module.exports = router;
