const Router = require('express');

const router = new Router();
const categoryRouter = require('./category.routes');
const userRouter = require('./user.routes');
const articleRouter = require('./article.routes');

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/articles', articleRouter);

module.exports = router;
