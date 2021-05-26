const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();
const likeController = require("../controllers/like-controller");

router.get("/", likeController.getLikes);
router.get("/:id", likeController.getLike);
router.post("/", auth, likeController.addLike);
router.delete("/:id", auth, likeController.deleteLike);

module.exports = router;
