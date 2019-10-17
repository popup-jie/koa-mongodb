const Router = require('koa-router')
import UserController from "../controller/userController"
import UserInfoControll from '../controller/userInfoController'
const router = new Router({
  prefix: '/user'
});

router.get('/list', UserController.getAllUser)
router.post('/loginUser', UserController.loginUser)
router.post('/saveUser', UserController.saveUser)
router.get('/remove', UserController.removeUser)
router.get('/loginToken', UserController.userTokenLogin)
router.post('/signOut', UserController.signOut)
router.post('/userChangePass', UserController.userChangePass)

router.post('/userSaveInfo', UserInfoControll.userSaveInfo)



module.exports = router
