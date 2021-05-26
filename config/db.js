const Sequelize = require("sequelize");

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.connection = connection;
db.User = require(`../models/User.js`)(connection);
db.Post = require("../models/Post")(connection);
db.Like = require("../models/Like")(connection);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Like);
db.Like.belongsTo(db.Post);

db.User.hasMany(db.Like);
db.Like.belongsTo(db.User);

module.exports = db;
