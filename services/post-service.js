const { Post } = require("../config/db");

class PostService {
  static async getPosts() {
    return Post.findAll({}).catch((err) => {
      throw err || "Error retrieving posts!";
    });
  }

  static async getPost(id) {
    return Post.findByPk(id).catch((err) => {
      throw err.message || "Error retrieving post!";
    });
  }

  static async addPost(post) {
    return Post.create(post).catch((err) => {
      throw err.message || "Error creating new post!";
    });
  }

  static async editPost(id, post) {
    return Post.update(
      { ...post },
      {
        where: {
          id,
        },
      }
    ).catch((err) => {
      throw err.message || "Error updating post!";
    });
  }

  static async deletePost(id) {
    return Post.destroy({
      where: {
        id,
      },
    }).catch((err) => {
      throw err.message || "Error deleting post!";
    });
  }

  static async getPostsByUser(userId) {
    return Post.findAll({
      where: {
        userId,
      },
    }).catch((err) => {
      throw err.message || "Error retrieving posts!";
    });
  }
}

module.exports = PostService;
