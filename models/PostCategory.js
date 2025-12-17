module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    },
    { 
      timestamps: false,
      tableName: 'PostCategories',
    },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};