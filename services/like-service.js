const { Like } = require("../config/db");

class LikeService {
  static async getLikes() {
    return Like.findAndCountAll({}).catch((err) => {
      throw err || "Error retrieving like!";
    });
  }

  static async addLike(like) {
    return Like.create(like).catch((err) => {
      throw err.message || "Error creating new like!";
    });
  }

  static async getLike(id) {
    return Like.findByPk(id).catch((err) => {
      throw err.message || "Error retrieving Like!";
    });
  }

  static async deleteLike(id) {
    return Like.destroy({
      where: {
        id,
      },
    }).catch((err) => {
      throw err.message || "Error deleting Like!";
    });
  }
}

module.exports = LikeService;
