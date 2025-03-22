const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Answer = sequelize.define(
    "Answer",
    {
        answerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },  
        content: { type: DataTypes.TEXT, allowNull: false },
        votes: { type: DataTypes.INTEGER, defaultValue: 0 },
        imageUrl: { type: DataTypes.STRING },
        isAccepted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: true }
  );

  Answer.associate = (models) => {
    Answer.belongsTo(models.User, {
      foreignKey: "authorId",
      onDelete: "CASCADE",
    });
    Answer.belongsTo(models.Question, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
    });
  };

  return Answer;
};