const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Tag = sequelize.define(
    "Tag",
    {
        tagid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: { type: DataTypes.TEXT },
    },
    { timestamps: true }
  );

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Question, {
      through: "QuestionTags",
      foreignKey: "tagId",
    });

    Tag.belongsToMany(models.Blog, {
      through: "BlogTags",
      foreignKey: "tagId",
    });
  };

  return Tag;
};
