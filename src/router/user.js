const Router = require('koa-router')
import UserController from "../controller/userController";
const router = new Router({
  prefix: '/user'
});

router.get('/list', UserController.getAllUser)
router.post('/saveUser', UserController.saveUser)
router.get('/remove', UserController.removeUser)

module.exports = router
