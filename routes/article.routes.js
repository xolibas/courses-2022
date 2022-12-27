const Router = require('express');

const router = new Router();
const articles = require('../controllers/article.controller');

router.post('/', articles.create);

router.put('/:id', articles.update);

router.get('/', articles.getAll);

router.get('/:id', articles.get);

router.delete('/:id', articles.delete);

module.exports = router;
