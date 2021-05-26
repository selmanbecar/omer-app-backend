const jwt = require("jsonwebtoken");
const LikeService = require("../services/like-service");

const validateOwner = (userId, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.user.id === userId || decoded.user.role === 1;
};

const addLike = async (req, res) => {
  const like = req.body;
  try {
    const newLike = await LikeService.addLike(like);
    res.status(201).send(newLike).end();
  } catch (e) {
    res.status(500).send(e.message).end();
    console.log(e);
  }
};

const getLikes = async (req, res) => {
  try {
    const likes = await LikeService.getLikes();

    res.send(likes).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};
const getLike = async (req, res) => {
  const { id } = req.params;
  try {
    const like = await LikeService.getLike(id);
    if (!like) {
      res.status(404).send({ message: "like doesn't exist!" }).end();
    } else {
      res.send(like).end();
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const deleteLike = async (req, res) => {
  const { id } = req.params;
  const token = req.header("x-auth-token");
  try {
    const like = await LikeService.getLikes(id);
    if (!like) {
      res.status(404).send({ message: "like doesn't exist!" }).end();
    }

    if (validateOwner(like.userId, token)) {
      await LikeService.deleteLike(id);
      res.send("like deleted").end();
    } else {
      res
        .status(403)
        .send({ message: "You are not owner of this like!" })
        .end();
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

module.exports = {
  addLike,
  getLikes,
  deleteLike,
  getLike,
};
