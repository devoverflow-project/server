const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
        userid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fullname: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: true, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING },
        profilelink: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING },
        bio: { type: DataTypes.TEXT },
        reputation: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { timestamps: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Question, { foreignKey: "authorId" });
    User.hasMany(models.Answer, { foreignKey: "authorId" });

    User.belongsToMany(models.Question, {
      through: "UserLikedQuestions",
      foreignKey: "userId",
    });

    User.belongsToMany(models.Blog, {
      through: "UserLikedBlogs",
      foreignKey: "userId",
    });

    User.belongsToMany(models.Job, {
      through: "UserLikedJobs",
      foreignKey: "userId",
    });
  };

  return User;
}