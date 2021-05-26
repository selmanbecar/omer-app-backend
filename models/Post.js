const Sequelize = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("post", {
    content: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
