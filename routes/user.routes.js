const Router = require('express');

const router = new Router();
const users = require('../controllers/user.controller');
const validateJWT = require('../middlewares/validateJWT');
const validateLogin = require('../middlewares/validators/login.validate');
const validateRegister = require('../middlewares/validators/register.validate');

router.post('/login', validateLogin, users.login);

router.post('/register', validateRegister, users.register);

router.get('/profile', validateJWT, users.getProfile);

module.exports = router;
