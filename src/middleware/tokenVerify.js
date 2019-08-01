import Promise from 'bluebird'
import * as jwt from 'jsonwebtoken'
const verify = Promise.promisify(jwt.verify)
import { secret } from '../config/index'
import ApiErrorNames from '../error/ApiErrorNames'
import ApiError from '../error/ApiError'

// 免除token验证的接口
const AvoidList = ['/user/loginUser', '/user/saveUser']

async function tokenVerify(ctx, next) {
  let url = ctx.request.url

  if (AvoidList.indexOf(url) > -1) {
    await next()
  } else {
    let token = ctx.request.headers['authorization']
    let payload = await verify(token, secret)
    let { time, timeout } = payload
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
