const Router = require('express').Router;
const userController = require('../controllers/userController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.post('/addauto', authMiddleware, userController.addAuto);
router.get('/userinfo/:carNumber', userController.getInfo);

module.exports = router;