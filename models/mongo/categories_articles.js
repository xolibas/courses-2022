const mongoose = require('mongoose');

const CategoryArticle = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    article: {
      type: mongoose.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model('CategoryArticle', CategoryArticle);
