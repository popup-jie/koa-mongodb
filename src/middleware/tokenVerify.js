import JsonToken from '../utils/jsontoken'
import ApiErrorNames from '../error/ApiErrorNames'
import ApiError from '../error/ApiError'

// 免除token验证的接口
const AvoidList = ['/user/loginUser', '/user/saveUser', '/user/loginToken']

async function tokenVerify(ctx, next) {
  let url = ctx.request.url

  if (AvoidList.indexOf(url) > -1) {
    await next()
  } else {
    let { time, timeout } = await JsonToken.getUserToken(ctx)
    let data = new Date().getTime();
    if (data - time <= timeout) {
      // 未过期
      await next();
    } else {
      throw new ApiError(ApiErrorNames.UserTokenVaild)
    }
  }
}

export default tokenVerify
