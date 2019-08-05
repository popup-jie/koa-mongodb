const Router = require('koa-router')
import ArticleController from "../controller/articleController"
const router = new Router({
  prefix: '/article'
});

router.get('/submit', ArticleController.submit)

module.exports = router