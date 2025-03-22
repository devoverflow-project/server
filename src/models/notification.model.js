const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define(
    "Notification",
    {
        notificationid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: { type: DataTypes.STRING, allowNull: false },
        isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: true }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Notification.belongsTo(models.Question, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
    });
  };

  return Notification;
};