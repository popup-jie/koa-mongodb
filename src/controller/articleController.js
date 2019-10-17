import Article from '../model/article'
import Jsontoken from '../utils/jsontoken'
import regex from '../config/regex'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
const filter = { '__v': 0, '_id': 0 }

class ArticleController {
  static async submit(ctx) {
    let { coverImg, title, label, subarea, resourceLink, zipCode, content } = ctx.request.body
    let { userid } = await Jsontoken.getUserToken(ctx)
    if (!regex.ImgCheck.test(coverImg)) {
      throw new ApiError(ApiErrorNames.ArticleCoverVaild)
    }

    if (!title || title === undefined) {
      throw new ApiError(ApiErrorNames.ArticleTitleVaild)
    }
    if (!label || label === undefined) {
      throw new ApiError(ApiErrorNames.ArticleLabelVaild)
    }
    if (!subarea || subarea === undefined) {
      throw new ApiError(ApiErrorNames.ArticleSubareaVaild)
    }

    if (resourceLink !== null && resourceLink !== undefined && resourceLink !== '' && !regex.urlCheck.test(resourceLink)) {
      throw new ApiError(ApiErrorNames.ArticleResourceLinkVaild)
    }

    if (content === null || content === '') {
      throw new ApiError(ApiErrorNames.ArticleContentVaild)
    }

    let article = new Article({
      coverImg, title, label, subarea, resourceLink, zipCode, content,
      userid: userid
    })
    await article.save()
  }

  static async getArticleList(ctx) {
    let { page = 1, pageNum = 10, keyword, status = 'all', sortType = 'createTime', subarea = 'all' } = ctx.request.query
    let { userid } = await Jsontoken.getUserToken(ctx)
    const reg = new RegExp(keyword, 'i')
    let contianer = {
      userid: userid,
      $or: [
        { title: { $regex: reg } }
      ]
    }

    if (status !== 'all') {
      contianer.status = status
    }
    if (subarea !== 'all') {
      contianer.subarea = subarea
    }

    let count = await Article.count(contianer)

    let res = await Article.find(contianer).sort({ [sortType]: -1 }).skip((page - 1) * pageNum).limit(pageNum)

    ctx.body = {
      totalPage: Math.ceil(count / pageNum),
      totalCount: count,
      list: res,
      page,
      pageNum
    }
  }

  static async getlist(ctx) {
    // console.log(ctx.request.query)

    let _s = await Article.find({}, filter).populate('userid', filter)
    ctx.body = _s
  }
}

export default ArticleController;