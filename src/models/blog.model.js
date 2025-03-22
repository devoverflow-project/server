const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Blog = sequelize.define(
    "Blog",
    {
      blogId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      images: {
        type: DataTypes.JSON, // Lưu danh sách URL ảnh dưới dạng mảng JSON
        allowNull: true,
      },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { timestamps: true }
  );

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: "authorId",
      onDelete: "CASCADE",
    });

    Blog.hasMany(models.Comment, {
      foreignKey: "blogId",
      onDelete: "CASCADE",
    });

    Blog.belongsToMany(models.Tag, {
      through: "BlogTags",
      foreignKey: "blogId",
    });

    Blog.belongsToMany(models.User, {
      through: "UserLikedBlogs",
      foreignKey: "blogId"
    });
  };

  return Blog;
};
