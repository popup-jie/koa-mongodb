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

  static async getlist(ctx) {
    let _s = await Article.find({}, filter).populate('userid', filter)
    ctx.body = _s
  }
}

export default ArticleController;