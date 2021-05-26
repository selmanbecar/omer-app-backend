const express = require("express");
const { auth, postAuth } = require("../middleware/auth");

const router = express.Router();
const postController = require("../controllers/post-controller");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", postAuth, postController.addPost);
router.put("/:id", auth, postController.editPost);
router.delete("/:id", auth, postController.deletePost);
router.get("/user/:id", postController.getPostsByUser);

module.exports = router;
