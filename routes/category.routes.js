const Router = require('express');

const router = new Router();
const categories = require('../controllers/category.controller');

router.post('/', categories.create);

router.put('/:id', categories.update);

router.get('/', categories.getAll);

router.get('/:id', categories.get);

router.delete('/:id', categories.delete);

module.exports = router;
