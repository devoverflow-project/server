const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize
  .sync({ alter: true, force: false }) // force: true will drop the table if it already exists and re-create it // alter: true will check the database table and update it if necessary
  .then(() => console.log("Database synchronized."))
  .catch((err) => console.error("Database sync error:", err));

module.exports = db;
