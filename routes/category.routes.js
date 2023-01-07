const Router = require('express');

const router = new Router();
const categories = require('../controllers/category.controller');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', validateJWT, categories.create);

router.get('/', categories.getAll);

router.delete('/:id', validateJWT, categories.deleteById);

module.exports = router;
