const Sequelize = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "user",
    {
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      rol: {
        type: Sequelize.INTEGER,
        default: 0,
      },
    },
    {
      timestamps: false,
    }
  );
