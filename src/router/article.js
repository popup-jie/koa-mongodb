const Router = require('koa-router')
import ArticleController from "../controller/articleController"
const router = new Router({
  prefix: '/article'
});

router.post('/submit', ArticleController.submit)
router.get('/getlist', ArticleController.getlist)


module.exports = router


