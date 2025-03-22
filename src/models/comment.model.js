const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: true }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Comment.belongsTo(models.Blog, {
      foreignKey: "blogId",
      onDelete: "CASCADE",
    });
  };

  return Comment;
};
