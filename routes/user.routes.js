const Router = require('express');

const router = new Router();
const users = require('../controllers/user.controller');

router.post('/login', users.login);

router.post('/register', users.register);

router.put('/:id', users.update);

router.get('/profile', users.getProfile);

router.get('/:id', users.get);

router.get('/', users.getAll);

router.delete('/:id', users.delete);

module.exports = router;
