/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.addConstraint('articles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'articles_users_association',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },

  async down(queryInterface) {
    queryInterface.removeConstraint('articles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'articles_users_association',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },
};
