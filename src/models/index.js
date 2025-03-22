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
db.User = require("./user.model")(sequelize);
db.Question = require("./question.model")(sequelize);
db.Answer = require("./answer.model")(sequelize);
db.Vote = require("./vote.model")(sequelize);
db.Tag = require("./tag.model")(sequelize);
db.Comment = require("./comment.model")(sequelize);
db.Notification = require("./notification.model")(sequelize);
db.Job = require("./job.model")(sequelize);
db.Blog = require("./blog.model")(sequelize);

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize
  .sync({ alter: true, force: false }) // force: true will drop the table if it already exists and re-create it // alter: true will check the database table and update it if necessary
  .then(() => console.log("Database synchronized."))
  .catch((err) => console.error("Database sync error:", err));

module.exports = db;
