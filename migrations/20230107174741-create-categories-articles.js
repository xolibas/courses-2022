/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories_articles', {
      articleId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: { model: 'articles', key: 'id' },
        onDelete: 'cascade',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onDelete: 'cascade',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('categories_articles');
  },
};
