const Router = require('koa-router')
import UserController from "../controller/userController";
import File from '../upload/upload'
const router = new Router({
  prefix: '/user'
});

router.get('/list', UserController.getAllUser)
router.post('/loginUser', UserController.loginUser)
router.post('/saveUser', UserController.saveUser)
router.get('/remove', UserController.removeUser)
router.get('/loginToken', UserController.userTokenLogin)
router.post('/upload', File.upload)

module.exports = router
