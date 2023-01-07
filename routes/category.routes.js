const Router = require('express');

const router = new Router();
const categories = require('../controllers/category.controller');

router.post('/', categories.create);

router.get('/', categories.getAll);

router.delete('/:id', categories.deleteById);

module.exports = router;
