const Router = require('express');

const router = new Router();
const articles = require('../controllers/article.controller');
const validateJWT = require('../middlewares/validateJWT');
const validateArticle = require('../middlewares/validators/article.validate');

router.post('/', validateJWT, validateArticle, articles.create);

router.get('/', articles.getAll);

router.delete('/:id', validateJWT, articles.deleteById);

router.put('/:id', validateJWT, validateArticle, articles.update);

module.exports = router;
