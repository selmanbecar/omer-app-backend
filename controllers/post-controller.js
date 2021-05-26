const jwt = require("jsonwebtoken");
const PostService = require("../services/post-service");

const validateOwner = (userId, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.user.id === userId || decoded.user.role === 1;
};

const addPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await PostService.addPost(post);
    res.status(201).send(newPost).end();
  } catch (e) {
    res.status(500).send(e.message).end();
    console.log(e);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostService.getPosts();

    res.send(posts).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostService.getPost(id);
    if (!post) {
      res.status(404).send({ message: "Post doesn't exist!" }).end();
    } else {
      res.send(post).end();
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  const token = req.header("x-auth-token");
  try {
    const post = await PostService.getPost(id);
    if (!post) {
      res.status(404).send({ message: "Post doesn't exist!" }).end();
    }
    if (validateOwner(post.userId, token)) {
      await PostService.editPost(id, newPost);
      const editedPost = await PostService.getPost(id);
      res.send(editedPost).end();
    } else {
      res
        .status(403)
        .send({ message: "You are not owner of this post!" })
        .end();
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.header("x-auth-token");
  try {
    const post = await PostService.getPost(id);
    if (!post) {
      res.status(404).send({ message: "Post doesn't exist!" }).end();
    }

    if (validateOwner(post.userId, token)) {
      await PostService.deletePost(id);
      res.send("Post deleted").end();
    } else {
      res
        .status(403)
        .send({ message: "You are not owner of this post!" })
        .end();
    }
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

const getPostsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await PostService.getPostsByUser(id);
    res.send(posts).end();
  } catch (e) {
    res.status(500).send(e.message).end();
  }
};

module.exports = {
  addPost,
  getPosts,
  getPost,
  editPost,
  deletePost,
  getPostsByUser,
};
