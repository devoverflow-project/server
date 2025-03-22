const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Vote = sequelize.define(
    "Vote",
    {
        voteid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        voteType: { type: DataTypes.INTEGER, allowNull: false }, // 1 (upvote), -1 (downvote)
    },
    { timestamps: true }
  );

  Vote.associate = (models) => {
    Vote.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Vote.belongsTo(models.Question, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
    });
    Vote.belongsTo(models.Answer, {
      foreignKey: "answerId",
      onDelete: "CASCADE",
    });
  };

  return Vote;
};
