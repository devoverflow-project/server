const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Question = sequelize.define(
    "Question",
    {
      questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      imageUrl: { type: DataTypes.STRING },
      votes: { type: DataTypes.INTEGER, defaultValue: 0 },
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { timestamps: true }
  );

  Question.associate = (models) => {
    Question.belongsTo(models.User, {
      foreignKey: "authorId",
      onDelete: "CASCADE",
    });

    Question.hasMany(models.Answer, { foreignKey: "questionId" });

    Question.belongsToMany(models.Tag, {
      through: "QuestionTags",
      foreignKey: "questionId",
    });

    Question.belongsToMany(models.User, {
      through: "UserLikedQuestions",
      foreignKey: "questionId",
    });
  };

  return Question;
};