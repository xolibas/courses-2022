/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.addConstraint(
      'categories_articles',
      {
        fields: ['articleId'],
        type: 'foreign key',
        name: 'categories_articles_articles_association',
        references: {
          table: 'articles',
          field: 'id',
        },
      },
      {
        fields: ['categoryId'],
        type: 'foreign key',
        name: 'categories_articles_categories_association',
        references: {
          table: 'categories',
          field: 'id',
        },
      }
    );
  },

  async down(queryInterface) {
    queryInterface.removeConstraint(
      'categories_articles',
      {
        fields: ['articleId'],
        type: 'foreign key',
        name: 'categories_articles_articles_association',
        references: {
          table: 'articles',
          field: 'id',
        },
      },
      {
        fields: ['categoryId'],
        type: 'foreign key',
        name: 'categories_articles_categories_association',
        references: {
          table: 'categories',
          field: 'id',
        },
      }
    );
  },
};
