const Router = require('koa-router')
import File from '../upload/upload'
const router = new Router();

router.post('/upload', File.upload)


module.exports = router
