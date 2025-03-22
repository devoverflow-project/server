const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Job = sequelize.define(
    "Job",
    {
      jobId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      shortDescription: { type: DataTypes.STRING, allowNull: false },
      type: {
        type: DataTypes.ENUM("full-time", "part-time"),
        allowNull: false,
      },
      location: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      salary: { type: DataTypes.STRING, allowNull: true },
    },
    { timestamps: true }
  );

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Job.belongsToMany(models.User, {
      through: "UserLikedJobs",
      foreignKey: "jobId",
    });
  };

  return Job;
};
