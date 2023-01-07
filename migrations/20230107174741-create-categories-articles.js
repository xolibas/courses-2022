/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories_articles', {
      articleId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('categories_articles');
  },
};
